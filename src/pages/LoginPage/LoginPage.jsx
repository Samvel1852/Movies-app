import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { getLocalStorage, setLocalStorage } from "../../helpers/localStorage";
import { storage } from "../../constants/storage";
import { Routes } from "../../constants/routes";
import { validationLogin } from "../../helpers/formValidation";
import { isUserValid } from "../../helpers/utils";
import SignInError from "../../components/Errors/SignInError";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function LoginPage() {
  const [errorSignUp, setErrorSignUp] = useState(false);
  const [errorPassEmail, setErrorPassEmail] = useState(false);

  const classes = useStyles();
  let history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationLogin,
    onSubmit: (values) => {
      const users = getLocalStorage(storage.users);
      if (users) {
        setErrorSignUp(!errorSignUp);
        if (isUserValid(users, values)) {
          setLocalStorage(storage.isAuth, true);
          history.push(`${Routes.homePage.url}`);
          setErrorPassEmail(!errorPassEmail);
        } else {
          setErrorPassEmail(!errorPassEmail);
        }
      } else {
        setErrorSignUp(!errorSignUp);
      }
    },
  });

  return getLocalStorage(storage.isAuth) ? (
    <Redirect to={Routes.homePage.url} />
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className={classes.form}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          {errorPassEmail ? (
            <SignInError message={"Wrong password or Email"} />
          ) : errorSignUp ? (
            <SignInError message={"Please Sign Up"} />
          ) : null}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link variant="body2" to="/signup">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
