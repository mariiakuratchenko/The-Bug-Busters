import React from 'react';


function Login(){
    return(
        <div>
            <h1>Login</h1>
            {/* Login Form */}
            <form>

                <div>
                    {/* Email Text Field */}
                    <label>Email</label>
                    <input>
                    </input>
                </div>
                <br />
                <div>
                    {/* Password Text Field */}
                    <label>Password</label>
                    <input>
                    </input>
                </div>
                <br />
                {/* Submit Button */}
                <button type="submit">
                    Submit
                </button>
                {/* Google Signin Button */}
                <button type="button">
                    Sign in with Google
                </button>

            </form>
        </div>
    )
}

export default Login;