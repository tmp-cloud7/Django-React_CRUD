import Form from "../components/Form"

function Login() {
    return <Form route="/api/token/" method="login" />
        
    // (
    //     <div>
    //         <Form route="/api/token/" method="login" />
    //         <p style={{ marginTop: "1rem" }}>
    //             Don’t have an account?{" "}
    //             <Link to="/register">Register here</Link>
    //         </p>
    //     </div>
    // );
}

export default Login