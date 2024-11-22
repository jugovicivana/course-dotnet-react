import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../app/store/configureStore";
import { signInUser } from "./accountSlice";

export default function Login(){
    const navigate=useNavigate();

    const location=useLocation();

    //const history=useHistory();
    const dispatch=useAppDispatch();

    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}}=useForm({
        mode: 'onTouched'
    })

    // const [values, setValues]=useState({
    //     username:'',
    //     password:'',
    // })
    // const handleSubmit=()=>{
    //     event?.preventDefault();
    //     agent.Account.login(values);
    // };

    // function handleInputChange(event:any){
    //     const {name, value}=event.target;
    //     setValues({...values, [name]:value})
    // }

    //SVE OVO GORE MIJENJAMO SA REACT HOOK FORMOM

    async function submitForm(data: FieldValues){
        // try {
        //     await agent.Account.login(data);
        // } catch (error) {
        //     console.log(error);
        // }
        try {
            await dispatch(signInUser(data));
            //navigate('/catalog');   //kad se uloguje da se prebaci na catalog stranicu
            //history.push
            navigate(location.state?.from || '/catalog');
        } catch (error) {
            console.log(error);
        }
        
    }



    return(
        <Container component={Paper} maxWidth="sm" sx={{display:'flex', flexDirection:'column', alignItems:'center', p:4}}>
            <Avatar sx={{m:1, bgcolor: 'secondary.main'}}>
                <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{mt:1}}>
                <TextField
                margin="normal"
                fullWidth
                label="Username"
                autoFocus
                {...register('username', {required:'Username is required'})}
                error={!!errors.username}
                helperText={errors?.username?.message as string}
                />
                <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                {...register('password', {required:'Password is required'})}
                error={!!errors.password}
                helperText={errors?.password?.message as string}
                />
                <LoadingButton loading={isSubmitting} 
                    disabled={!isValid}
                    type="submit" fullWidth variant="contained" 
                    sx={{mt:3, mb:2}}
                >
                    Sign In
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to='/register'>
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}