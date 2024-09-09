import { CheckCircle, MessageCircle, BarChart2, Users } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="container mx-auto px-4 py-8 text-black">
        <nav className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">Reform</h1>
          <div>
            <button className="mr-2 px-4 py-2 bg-transparent border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100">
              Log In
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 text-black">
        <section className="text-center py-20">
          <h2 className="text-5xl font-bold mb-4">Revolutionize Your Surveys with AI</h2>
          <p className="text-xl mb-8">
            Engage your audience with adaptive, chat-based surveys powered by artificial intelligence.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Start as Business
            </button>
            <button className="px-8 py-4 bg-transparent border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100">
              Take Surveys
            </button>
          </div>
        </section>

        <section className="py-20">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MessageCircle, title: "AI-Powered Chats", description: "Engage users with natural, adaptive conversations." },
              { icon: BarChart2, title: "Real-Time Analysis", description: "Get instant insights as responses come in." },
              { icon: Users, title: "User Segmentation", description: "Target specific groups for more relevant surveys." },
              { icon: CheckCircle, title: "Easy to Use", description: "Intuitive interface for both creators and respondents." },
            ].map((feature, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 text-center shadow-lg">
                <feature.icon className="h-10 w-10 text-blue-500 mb-4 mx-auto" />
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20">
          <h3 className="text-3xl font-bold text-center mb-12">Pricing Plans</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Basic", price: "$29", features: ["100 survey responses/mo", "Basic AI features", "Email support"] },
              { title: "Pro", price: "$99", features: ["1000 survey responses/mo", "Advanced AI analysis", "Priority support"] },
              { title: "Enterprise", price: "Custom", features: ["Unlimited responses", "Custom AI model", "Dedicated account manager"] },
            ].map((plan, index) => (
              <div
                key={index}
                className={`border border-gray-200 rounded-lg p-6 shadow-lg ${index === 1 ? "border-blue-500" : ""} text-black`}
              >
                <h4 className="text-2xl font-bold mb-2">{plan.title}</h4>
                <p className="text-3xl font-bold mb-4">{plan.price}</p>
                {index === 1 && <p className="text-blue-500 font-semibold">Most Popular</p>}
                <ul className="space-y-2 my-4 text-left">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8 text-black">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Reform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
