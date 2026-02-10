import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Input, Button, Card, CardBody } from "@heroui/react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <Card className="w-full max-w-md bg-gray-800 shadow-lg">
        <CardBody className="p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Login to ENZEE MOVIES
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="email"
              label="Email"
              labelPlacement="outside"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              classNames={{
                inputWrapper: "bg-gray-700 text-white",
                label: "text-gray-400",
              }}
              isRequired
            />

            <Input
              type="password"
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              classNames={{
                inputWrapper: "bg-gray-700 text-white",
                label: "text-gray-400",
              }}
              isRequired
            />

            <Button
              type="submit"
              color="primary"
              className="w-full"
              size="lg"
            >
              Login
            </Button>
          </form>

          <p className="text-gray-400 text-center mt-6 text-sm">
            Don’t have an account?{" "}
            <RouterLink
              to="/signup"
              className="text-blue-400 hover:underline"
            >
              Sign Up
            </RouterLink>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
