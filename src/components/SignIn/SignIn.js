import React from 'react';
// import './SignIn.css'

const SignIn = ({onRouteChange}) => {
    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 pa4">
            <div action="sign-up_submit" method="get" acceptCharset="utf-8">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email address</label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password" />
                    </div>
                </fieldset>
                <div className="mt3">
                    <input 
                        onClick={() => onRouteChange('home')}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Sign In"/>
                </div>
                <div>
                    <p onClick={ () => onRouteChange('register')} className="f6 link dim black pointer">Register</p>
                </div>
            </div>
        </article>
    );
}

export default SignIn;