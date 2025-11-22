import React from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";

function Register(){
    return(
        <div>
            <div>
                <div>
                    <div>
                        <div>
                            {/* Header for Registration Form */}
                            <h1>Add a new user</h1>
                            <form>
                                {/* First Name Text Field */}
                                <div>
                                    <label>First Name</label>
                                    <input>
                                    </input>
                                </div>
                                <br />
                                <div>
                                    {/* Last Name Text Field */}
                                    <label>Last Name</label>
                                    <input>
                                    </input>
                                </div>
                                <br />
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
                                <div>
                                    {/* Confirm Password Text Field */}
                                    <label>Confirm Password</label>
                                    <input>
                                    </input>
                                </div>
                                <br />

                                <br />
                                {/* Submit Button */}
                                <button>
                                    
                                    Submit
                                </button>
                                {/* Cancel Button */}
                                <Link>
                                    Cancel
                                </Link>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;