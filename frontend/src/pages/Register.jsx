import Form from "../components/Form"

function Register() {
    return <Form route="/api/user/register/" method="register" />
    // (
    //     <div>
    //         <Form route="/api/user/register/" method="register" />
    //         <p style={{ marginTop: "1rem" }}>
    //             Already have an account?{" "}
    //             <Link to="/login">Login here</Link>
    //         </p>
    //     </div>
    // );
}

export default Register