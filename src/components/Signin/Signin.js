import React from "react";

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            isError: false
        }
    }
    onEmailChange = (event) => {
        this.setState({
            email : event.target.value,
            isError: false
        })
    }
    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value,
            isError: false
        })
    }

    onSubmitSignin = () => {
        fetch("http://localhost:3000/signin", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange("home")
                }
                else {
                    this.setState({isError: true})
                }
            })
    }

    render () {
        const {onRouteChange} = this.props
        return (
            <div>
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    onChange={this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="email" name="email-address" id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                       type="password" name="password" id="password"/>
                            </div>
                            {(this.state.isError) ?  <p className={'text-danger'}>Password or email not matched</p> : ""}
                            <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignin}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit" value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                            <a
                                onClick={() => onRouteChange("signup")}
                                href="#0" className="f6 link dim black db">Sign up</a>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

}

export default SignIn