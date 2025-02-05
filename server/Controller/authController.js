const express = require('express');
const { Validator } = require('node-input-validator')
const bcrypt = require('bcryptjs')
const User = require('../Models/User')
const siteHelper = require('../Helpers/site_helpers')

module.exports = {
    register: async function (req, resp) {
        try {
            const v = new Validator(req.body, {
                userName: 'required',
                email: 'required|email',
                password: 'required|length:20,8',
                cpassword: 'required|same:password',
            })
            const matched = await v.check();
            if (!matched) {
                return resp.status(422).send({
                    status: 'val_error',
                    message: "Validation error",
                    val_msg: v.errors
                })
            }
            const user_details = await User.findOne({ email: req.body.email })
            if (user_details) {
                return resp.status(409).send({
                    status: 'error',
                    message: 'User already exits.'
                })
            }
            let hash_password = await bcrypt.hash(req.body.password, 10);
            let doc = {
                userName: req.body.userName,
                email: req.body.email,
                password: hash_password,
                profilepic: req.body.profilepic,
                role: req.body.role,
            }
            // console.log(doc  , "doc")
            const data = await User.create(doc);
            return resp.status(200).send({
                status: "success",
                message: "User has been registered successfully!",
            })
        } catch (error) {
            return resp.status(500).send({
                status: 'error',
                message: e?.message ?? 'something went wrong.'
            })
        }
    },
    signin: async function (req, resp) {
        const { email, password } = req.body;
        try {
            const v = new Validator(req.body, {
                email: 'required|email',
                password: 'required|length:20,8'
            })

            const matched = await v.check();
            if (!matched) {
                return resp.status(422).send({
                    status: 'val_error',
                    message: "Validation error",
                    val_msg: v.errors
                })
            }

            const checkuser = await User.findOne({ email })
            if (!checkuser) {
                return resp.status(404).send({
                    status: 'error',
                    message: "User does't exists! Please register."
                })
            }
            const checkPasswordMatch = await bcrypt.compare(
                password,
                checkuser.password
            );
            if (!checkPasswordMatch) {
                return resp.status(401).send({
                    success: false,
                    message: "Wrong credential! Please try again",
                });
            }
            let payload = {
                id: checkuser._id,
                userName: checkuser.userName,
                email: checkuser.email,
                role: checkuser.role,
                status: checkuser?.status
            }

            const token = await siteHelper.generateToken(payload);
            return resp.cookie("token", token, { httpOnly: true, secure: false }).status(200).send({
                status: 'success',
                message: "Logged in successfully",
                userData: {
                    email: checkuser.email,
                    role: checkuser.role,
                    id: checkuser._id,
                    userName: checkuser.userName,
                },
            })
        } catch (e) {
            return resp.status(500).send({
                status: 'error',
                message: e?.message ?? 'something went wrong.'
            })
        }
    }
}