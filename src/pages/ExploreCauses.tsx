import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const ExploreCauses = () => {
  const navigate = useNavigate();

  // This would come from your API in a real app
  const causeCategories = [
    {
      title: "Trending in Your Area",
      causes: [
        { id: 1, name: "Local Food Bank", impact: "Provided 10,000 meals last month", imageUrl: "/placeholder.svg" },
        { id: 2, name: "City Youth Programs", impact: "Supporting 500 at-risk youth", imageUrl: "/placeholder.svg" },
        { id: 3, name: "Community Garden", impact: "Growing fresh produce for families", imageUrl: "/placeholder.svg" },
      ]
    },
    {
      title: "Based on Your Faith",
      causes: [
        { id: 4, name: "Interfaith Housing", impact: "Building homes for families", imageUrl: "/placeholder.svg" },
        { id: 5, name: "Religious Education", impact: "Supporting spiritual growth", imageUrl: "/placeholder.svg" },
        { id: 6, name: "Faith-Based Healthcare", impact: "Providing care to underserved", imageUrl: "/placeholder.svg" },
      ]
    },
    {
      title: "Because You Support Environmental Causes",
      causes: [
        { id: 7, name: "Ocean Cleanup", impact: "Removed 5 tons of plastic", imageUrl: "/placeholder.svg" },
        { id: 8, name: "Reforestation Project", impact: "Planted 50,000 trees", imageUrl: "/placeholder.svg" },
        { id: 9, name: "Clean Energy Initiative", impact: "Solar panels for schools", imageUrl: "/placeholder.svg" },
      ]
    },
    {
      title: "Popular with Similar Donors",
      causes: [
        { id: 10, name: "Mental Health Support", impact: "Helped 1,000 individuals", imageUrl: "/placeholder.svg" },
        { id: 11, name: "Digital Literacy", impact: "Training for seniors", imageUrl: "/placeholder.svg" },
        { id: 12, name: "Animal Shelter", impact: "Found homes for 200 pets", imageUrl: "/placeholder.svg" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container pt-24 pb-8">
        <h1 className="text-3xl font-bold mb-8">Explore Causes</h1>
        
        <div className="space-y-12">
          {causeCategories.map((category) => (
            <section key={category.title}>
              <h2 className="text-2xl font-semibold mb-4">{category.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.causes.map((cause) => (
                  <Card 
                    key={cause.id}
                    className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => navigate(`/cause/${cause.id}`)}
                  >
                    <div className="aspect-video relative">
                      <img 
                        src={cause.imageUrl} 
                        alt={cause.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{cause.name}</h3>
                      <p className="text-sm text-muted-foreground">{cause.impact}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExploreCauses;