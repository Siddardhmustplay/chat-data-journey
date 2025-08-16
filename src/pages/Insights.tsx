import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BarChart3, TrendingUp, AlertTriangle } from "lucide-react";

const Insights = () => {
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();

  const autoInsights = [
    {
      icon: BarChart3,
      color: "bg-insight-blue",
      title: "Top 3 Securities IDs by Market Value are SPC-129, SPC-456, SEC-789",
      subtitle: "SEC-455 makes up 32% of the portfolio – a possible concentration risk."
    },
    {
      icon: TrendingUp,
      color: "bg-insight-purple",
      title: "Overall Book Value increased 12% compared to last month",
      subtitle: ""
    },
    {
      icon: AlertTriangle,
      color: "bg-insight-orange",
      title: "Security SEC-111 shows an unusually high Purchase Value (4× peer average)",
      subtitle: ""
    }
  ];

  const suggestedQuestions = [
    "Which Security ID has the highest Book Value in Position Currency?",
    "What is the trend of Market Value over time?",
    "Which Product Type dominates Purchase Value?"
  ];

  const handleAskQuestion = () => {
    if (question.trim()) {
      navigate('/chat');
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Auto Insights for You</h1>
        </div>

        {/* Auto Insights */}
        <div className="space-y-4">
          {autoInsights.map((insight, index) => (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${insight.color} text-white`}>
                  <insight.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {insight.title}
                  </h3>
                  {insight.subtitle && (
                    <p className="text-muted-foreground text-sm">
                      {insight.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Suggested Questions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Suggested questions</h2>
          <div className="space-y-2">
            {suggestedQuestions.map((q, index) => (
              <button
                key={index}
                onClick={() => setQuestion(q)}
                className="block w-full text-left p-3 text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                • {q}
              </button>
            ))}
          </div>
        </div>

        {/* Ask Anything Input */}
        <Card className="p-6">
          <div className="flex space-x-4">
            <Input
              placeholder="Ask Anything"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAskQuestion()}
              className="flex-1"
            />
            <Button onClick={handleAskQuestion} disabled={!question.trim()}>
              Ask
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

export default Insights;