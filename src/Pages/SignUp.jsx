import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Input, Button, Card, CardBody } from "@heroui/react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up:", { email, password });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <Card className="w-full max-w-md bg-gray-800 shadow-lg">
        <CardBody className="p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Create Your Account
          </h2>

          <p className="text-gray-400 text-center mb-6 text-sm">
            Sign up to get started with ENZEE MOVIES
          </p>

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
              placeholder="Create a password"
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
              color="success"
              className="w-full"
              size="lg"
            >
              Sign Up
            </Button>
          </form>

          <p className="text-gray-400 text-center mt-6 text-sm">
            Already have an account?{" "}
            <RouterLink
              to="/login"
              className="text-blue-400 hover:underline"
            >
              Login
            </RouterLink>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

export default SignUp;
