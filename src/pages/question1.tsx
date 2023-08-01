import {
	CardContent,
	Container,
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material";
import React from "react";
import Navbar from "../components/navbar";
import { Q1WrapperContent } from "../components/wrapper";
import { useFormik } from "formik";
import Card from "@mui/material/Card";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Button from "@mui/material/Button";
import * as yup from "yup";

interface Values {
	name: string;
	age: string;
	active: string;
	date: string;
}

export default function Question1() {
	const validationSchema = yup.object({
		name: yup.string().required("Name is required"),
		date: yup.string().required("Date is required"),
		active: yup.number().required("Select one of the statuses"),
		age: yup.number().min(1, "Minimum Age is 1").max(70, "Maximum Age is 70").required("Age is Required"),
	});
	const formik = useFormik({
		initialValues: {
			name: "",
			date: "",
			active: "",
			age: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});
	return (
		<Container sx={{ pt: 2 }}>
			<Navbar
				prevTitle="Back to Home"
				nextTitle="Question 2"
				prevRoute="/"
				nextRoute="/question2"
				title="Question 1"
			>
				<Q1WrapperContent />
			</Navbar>
			<Card sx={{ background: "#fff" }} raised>
				<CardContent>
					<form onSubmit={formik.handleSubmit}>
						<Grid container spacing={2} justifyContent={"center"}>
							<Grid item xs={6}>
								<TextField
									fullWidth
									id="name"
									name="name"
									label="Name"
									value={formik.values.name}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.name && Boolean(formik.errors.name)}
									helperText={formik.touched.name && formik.errors.name}
								/>
							</Grid>
							<Grid item xs={6}>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										label="Date"
										value={formik.values.date}
										onChange={(newValue) => {
											formik.setFieldValue("date", newValue, true);
										}}
										renderInput={(params) => (
											<TextField
												fullWidth
												{...params}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.date}
												error={formik.touched.date && Boolean(formik.errors.date)}
												helperText={formik.touched.date && formik.errors.date}
												variant="outlined"
												placeholder="mm/dd/yyyy"
											/>
										)}
									/>
								</LocalizationProvider>
							</Grid>
							<Grid item xs={6}>
								<FormControl error={formik.touched.active && Boolean(formik.errors.active)}>
									<FormLabel id="demo-radio-buttons-group-label">Active</FormLabel>
									<RadioGroup
										aria-labelledby="demo-radio-buttons-group-label"
										defaultValue="female"
										name="active"
										value={formik.values.active}
									>
										<FormControlLabel
											onChange={formik.handleChange}
											value={1}
											control={<Radio />}
											label="True"
										/>
										<FormControlLabel
											onChange={formik.handleChange}
											value={0}
											control={<Radio />}
											label="False"
										/>
									</RadioGroup>
									<FormHelperText>{formik.errors.active}</FormHelperText>
								</FormControl>
							</Grid>
							<Grid item xs={6}>
								<TextField
									fullWidth
									id="age"
									name="age"
									label="Age"
									type="number"
									InputProps={{
										inputProps: {
											max: 70,
											min: 1,
										},
									}}
									value={formik.values.age}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.age && Boolean(formik.errors.age)}
									helperText={formik.touched.age && formik.errors.age}
								/>
							</Grid>
							<Grid item xs={3}>
								<Button variant="contained" type="submit" fullWidth>
									Submit
								</Button>
							</Grid>
						</Grid>
					</form>
				</CardContent>
			</Card>
		</Container>
	);
}
