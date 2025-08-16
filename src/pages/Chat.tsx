import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: string;
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

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Math.random().toString(),
        content: newMessage,
        sender: "user",
        timestamp: new Date().toLocaleString()
      };

      setMessages(prev => [...prev, userMessage]);
      setNewMessage("");

      // Simulate bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: Math.random().toString(),
          content: "I'm processing your question about the financial data. Here's what I found based on your dataset...",
          sender: "bot",
          timestamp: new Date().toLocaleString()
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
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
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <Card className="p-4">
          <div className="flex space-x-4">
            <Input
              placeholder="Ask Anything"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              Send
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