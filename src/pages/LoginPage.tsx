import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // In a real application, you would validate the code against a predefined value or an API
    // For this example, any non-empty code will be considered valid
    if (code) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px] bg-white bg-opacity-20">
        <CardHeader>
          <CardTitle className="text-white">Login</CardTitle>
          <CardDescription className="text-gray-200">Enter the code to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input 
                id="code" 
                placeholder="Enter code" 
                value={code} 
                onChange={(e) => setCode(e.target.value)}
                className="bg-white bg-opacity-50 text-black placeholder-gray-600"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">Login</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
