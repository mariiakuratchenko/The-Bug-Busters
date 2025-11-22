import React from 'react';


function Login(){
    return(
        <div>
            {/* Container for Login Form */}
            <div className="container">
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Signin</h1>
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

            </div>
        </div>
        </div>
    )
}

export default Login;