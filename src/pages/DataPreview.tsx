import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const DataPreview = () => {
  const [activeTab, setActiveTab] = useState("preview");
  const navigate = useNavigate();

  // Sample data that would come from ChatGPT API
  const sampleData = [
    { 
      securities_id: "SEC-123456", 
      date: "2024-01-01", 
      product_type: "Equity", 
      book_value: "120,000", 
      market_value: "135,000" 
    },
    { 
      securities_id: "SEC-245678", 
      date: "2024-01-01", 
      product_type: "Fund", 
      book_value: "95,000", 
      market_value: "135,000" 
    },
    { 
      securities_id: "SEC-245688", 
      date: "2024-01-09", 
      product_type: "Equity", 
      book_value: "52,000", 
      market_value: "155,000" 
    },
    { 
      securities_id: "SEC-245788", 
      date: "2024-01-09", 
      product_type: "Fund", 
      book_value: "95,000", 
      market_value: "100,000" 
    },
    { 
      securities_id: "SEC-245885", 
      date: "2024-01-01", 
      product_type: "Fund", 
      book_value: "120,000", 
      market_value: "100,000" 
    },
    { 
      securities_id: "SEC-245678", 
      date: "2024-01-09", 
      product_type: "Equity", 
      book_value: "95,000", 
      market_value: "150,000" 
    }
  ];

  const schemaData = [
    { field: "securities_id", type: "String", description: "Unique identifier for securities" },
    { field: "date", type: "Date", description: "Transaction or valuation date" },
    { field: "product_type", type: "String", description: "Type of financial product" },
    { field: "book_value", type: "Number", description: "Book value of the security" },
    { field: "market_value", type: "Number", description: "Current market value" }
  ];

  useEffect(() => {
    // Auto-redirect to insights after 5 seconds
    const timer = setTimeout(() => {
      navigate("/insights");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Holdings reports</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/")}
          >
            <X className="w-4 h-4" />
            Close
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === "preview" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("preview")}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Data Preview
          </Button>
          <Button
            variant={activeTab === "schema" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("schema")}
            className={activeTab === "schema" ? "" : "text-foreground"}
          >
            Data Schema
          </Button>
        </div>

        {/* Content */}
        <Card className="p-6">
          {activeTab === "preview" ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Data Preview</h3>
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 font-medium text-foreground">Securities ID</th>
                      <th className="text-left p-3 font-medium text-foreground">Date</th>
                      <th className="text-left p-3 font-medium text-foreground">Product Type</th>
                      <th className="text-left p-3 font-medium text-foreground">Book Value</th>
                      <th className="text-left p-3 font-medium text-foreground">Market Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.map((row, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-3 text-foreground">{row.securities_id}</td>
                        <td className="p-3 text-muted-foreground">{row.date}</td>
                        <td className="p-3 text-muted-foreground">{row.product_type}</td>
                        <td className="p-3 text-muted-foreground">{row.book_value}</td>
                        <td className="p-3 text-muted-foreground">{row.market_value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Data Schema</h3>
              <div className="space-y-4">
                {schemaData.map((field, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-foreground">{field.field}</span>
                      <Badge variant="outline">{field.type}</Badge>
                    </div>
                    <span className="text-muted-foreground text-sm max-w-md">
                      {field.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Auto-redirect notification */}
        <div className="text-center text-muted-foreground text-sm">
          Automatically redirecting to insights in a few seconds...
        </div>
      </div>
    </div>
  );
};

export default DataPreview;