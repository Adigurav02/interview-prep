import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  
  const user = await getCurrentUser();
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e0f1a] via-[#1a1c2b] to-[#101018] text-white p-8">
      
      {/* Page Heading */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#7f5af0] to-[#2cb67d] text-transparent bg-clip-text">
          Interview Generator
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Simulate real-time interviews with AI and get instant insights on your performance.
        </p>
      </div>
      

      {/* Agent Component */}
      <div className="max-w-5xl mx-auto bg-[#161826] rounded-2xl p-6 shadow-lg border border-[#2e2f3a]">
        
        {/* Space before Call Button */}
        <div className="mt-20" />
        
        <Agent
          userName={user?.name!}
          userId={user?.id}
          profileImage={user?.profileURL}
          type="generate"
        />
        
        {/* Space after Call Button */}
        <div className="mb-10" />
        
      </div>
      
    </div>
  );
};

export default Page;
