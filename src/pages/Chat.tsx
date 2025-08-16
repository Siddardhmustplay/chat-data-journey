import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { askQuestion } from "@/lib/api";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: string;
  sqlQuery?: string;
  preview?: any;
  chart?: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Which Securities ID holds the highest Book Value in Position Currency?",
      sender: "user",
      timestamp: "Friday 4:53 PM"
    },
    {
      id: "2", 
      content: "Here are the top 9 rows from your query.",
      sender: "bot",
      timestamp: "Friday 4:53 PM"
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const dbPath = localStorage.getItem('dbPath');
    if (!dbPath) {
      toast({
        title: "No dataset found",
        description: "Please upload a dataset first.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Math.random().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        hour: 'numeric', 
        minute: '2-digit' 
      })
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage("");
    setIsLoading(true);

    try {
      const data = await askQuestion(currentMessage, dbPath);
      
      if (data.error) {
        throw new Error(data.error);
      }

      const botMessage: Message = {
        id: Math.random().toString(),
        content: "Here's what I found based on your dataset:",
        sender: "bot",
        timestamp: new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          hour: 'numeric', 
          minute: '2-digit' 
        }),
        sqlQuery: data.sql_query,
        preview: data.preview,
        chart: data.chart
      };
      
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process your question",
        variant: "destructive",
      });
      
      const errorMessage: Message = {
        id: Math.random().toString(),
        content: "I'm sorry, I encountered an error processing your question. Please try again.",
        sender: "bot",
        timestamp: new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          hour: 'numeric', 
          minute: '2-digit' 
        })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-8">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Financial Analytics Chat</h1>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-6 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className={message.sender === "user" ? "bg-chat-user" : "bg-chat-bot"}>
                  {message.sender === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-foreground" />
                  )}
                </AvatarFallback>
              </Avatar>
              
              <div className={`max-w-2xl ${message.sender === "user" ? "text-right" : ""}`}>
                <div className="text-xs text-muted-foreground mb-1">
                  {message.sender === "user" ? "You" : "Fin Genie"} · {message.timestamp}
                </div>
                
                <Card className={`p-4 ${
                  message.sender === "user" 
                    ? "bg-chat-user text-white border-chat-user" 
                    : "bg-card"
                }`}>
                  <p className={message.sender === "user" ? "text-white" : "text-foreground"}>
                    {message.content}
                  </p>
                  
                  {/* Show SQL Query if available */}
                  {message.sqlQuery && (
                    <div className="mt-4 p-3 bg-secondary rounded-lg">
                      <p className="text-sm font-semibold text-foreground mb-2">SQL Query:</p>
                      <code className="text-xs text-muted-foreground">{message.sqlQuery}</code>
                    </div>
                  )}
                  
                  {/* Show Data Preview if available */}
                  {message.preview && (
                    <div className="mt-4 p-3 bg-secondary rounded-lg">
                      <p className="text-sm font-semibold text-foreground mb-2">Data Preview:</p>
                      <div className="text-xs text-muted-foreground overflow-auto">
                        <pre>{JSON.stringify(message.preview, null, 2)}</pre>
                      </div>
                    </div>
                  )}
                  
                  {/* Show Chart if available */}
                  {message.chart && (
                    <div className="mt-4">
                      <img 
                        src={`data:image/png;base64,${message.chart}`} 
                        alt="Generated Chart"
                        className="max-w-full h-auto rounded-lg"
                      />
                    </div>
                  )}
                </Card>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-chat-bot">
                  <Bot className="w-4 h-4 text-foreground" />
                </AvatarFallback>
              </Avatar>
              
              <div className="max-w-2xl">
                <div className="text-xs text-muted-foreground mb-1">
                  Fin Genie · Processing...
                </div>
                
                <Card className="p-4 bg-card">
                  <p className="text-foreground">Processing your question...</p>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <Card className="p-4">
          <div className="flex space-x-4">
            <Input
              placeholder="Ask Anything"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!newMessage.trim() || isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-muted-foreground text-sm">
          Fin Genie can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
};

export default Chat;