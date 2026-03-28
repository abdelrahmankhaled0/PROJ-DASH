import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  //   type userDataType = {
  //     userName: string;
  //     password: string;
  //   };

  const [user, setUser] = useState<LoginFormValues>({
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginFormValues>>({});

  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            width: "40%",
            padding: "50px",
            textAlign: "center",

            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
            }}
          >
            <Typography>PROJ-DASH</Typography>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              Log In
            </Typography>
            <Typography
              color="primary"
              sx={{ fontWeight: "bold", marginBottom: "20px" }}
            >
              Welcome back again in PROJ-DASH
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              const result = loginSchema.safeParse(user);
              if (!result.success) {
                const fieldErrors = result.error.flatten().fieldErrors;
                setErrors({
                  userName: fieldErrors.userName?.[0],
                  password: fieldErrors.password?.[0],
                });
                return;
              }

              setErrors({});
              localStorage.setItem("userInfo", JSON.stringify(user));
              setUser({
                userName: "",
                password: "",
              });
              navigate("/home");
            }}
            sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <TextField
              value={user.userName}
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  userName: e.target.value,
                }));
                setErrors((prev) => ({ ...prev, userName: undefined }));
              }}
              error={Boolean(errors.userName)}
              helperText={errors.userName}
              type="text"
              label="Enter your Username"
              variant="outlined"
            />
            <TextField
              value={user.password}
              onChange={(e) => {
                setUser((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
                setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              error={Boolean(errors.password)}
              helperText={errors.password}
              type="password"
              label="Enter your Password"
              variant="outlined"
            />
            <Button
              type="submit"
              sx={{ textTransform: "capitalize" }}
              variant="contained"
            >
              Login
            </Button>
            <Box sx={{ marginTop: "20px" }}>
              <Typography
                sx={{ cursor: "pointer" }}
                color="primary"
                component="a"
              >
                Forget password?
              </Typography>
              <Box>
                Don't have an account?
                <Typography
                  color="primary"
                  sx={{ cursor: "pointer" }}
                  component="a"
                >
                  Register now
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
