const firebase = require('firebase')
var app;
const ipAddress = 'r-3-backend-uex48.ondigitalocean.app'

const init = async () => {
    const config = {
        apiKey: "AIzaSyCPGmGung2Q8vImY4kIMYm1rX0RIoBCjNU",
        authDomain: "recite-3.firebaseapp.com",
        projectId: "recite-3",
        storageBucket: "recite-3.appspot.com",
        messagingSenderId: "581961862369",
        appId: "1:581961862369:web:50d8f7e6b89fa6a7293ba0",
        measurementId: "G-T5E5VF4DMJ"
    }

    // Initialize app
    app = await firebase.initializeApp(config)
}

const loginCheck = async () => {
    app.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid)
            return user
        } else {
            console.log(null)
        }
    })
}

const loginAdmin = async (flow, id, flag, name, email, password, role, auth, languagePref, emailReg, passwordReg) => {
    // ChikayoSahaku@jourrapide.com
    // Ro7aeshie

    // NahoNagasawa@dayrep.com
    // aiz2Iwie2

    // Admin
    await app.auth().signInWithEmailAndPassword(email, password)
        .then(async (_) => {
            switch (flow) {
                case 'register':
                    await register(name, emailReg, passwordReg, role, auth)
                    break
                case 'setreviewed':
                    await setReviewedFlag(id, flag)
                    break
                case 'retrieve':
                    await getUnreviewedRecital(id)
                    break
                case 'getprofilecs':
                    await getCSProfile(id)
                    break
                case 'getme':
                    await getMeAdmin()
                    break
                case 'updateme':
                    await updateMe(name, email, languagePref, role)
                    break
                case 'updatemypassword':
                    await updateMyPassword(password, role)
                    break
                case 'deleteme':
                    await deleteMe(role)
                    break
                default:
                    await getDummy()
            }
        })
        .catch((error) => {
            console.error(error)
        })

}

const loginCS = async (flow, name, email, languagePref, role, password, id) => {
    // HudhayfahKazimTuma@dayrep.com
    // aiquo6OoV9m

    // RadeyahUmaymaMustafa@teleworm.us
    // Iev1ujimoon

    // abuabi@gmail.com
    // abuab123

    // CS
    await app.auth().signInWithEmailAndPassword(email, password)
        .then(async (_) => {
            switch (flow) {
                case 'getme':
                    await getMeCS()
                    break
                case 'updateme':
                    await updateMe(name, email, languagePref, role)
                    break
                case 'updatemypassword':
                    await updateMyPassword(password, role)
                    break
                case 'submitfeedback':
                    await submitFeedback(id)
                    break
                case 'deleteme':
                    await deleteMe(role)
                    break
                default:
                    await getDummy()
            }
        })
        .catch((error) => {
            console.error(error)
        })

}

const loginUser = async (flow, id, flag, chapter, verse, submissionType, submissionURL, name, email, languagePref, role, password) => {
    // User
    // KevinSTrembley@dayrep.com
    // Ohz9ohPhu9

    // XueHsueh@armyspy.com
    // abc123902618

    // hang_tuah@gmail.com
    // h4ngtuah
    await app.auth().signInWithEmailAndPassword(email, password)
        .then(async (_) => {
            switch (flow) {
                case 'submit':
                    await submitRecital(chapter, verse, submissionType, submissionURL)
                    break
                case 'retrieve':
                    await getRecital(id, flag)
                    break
                case 'getme':
                    await getMeUser()
                    break
                case 'updateme':
                    await updateMe(name, email, languagePref, role)
                    break
                case 'updatemypassword':
                    await updateMyPassword(password, role)
                    break
                case 'getrtbalance':
                    await getRTBalance()
                    break
                case 'getsubmissionpermission':
                    await getSubmissionPermission()
                    break
                case 'deleteme':
                    await deleteMe(role)
                    break
                default:
                    await getDummy()
            }
        })
        .catch((error) => {
            console.error(error)
        })

}

const register = async (name, email, password, role, auth) => {
    const https = require('https')

    try {
        let path, options

        const body = {
            name: name,
            email: email,
            password: password,
            role: role
        }

        const bodyStr = JSON.stringify(body)

        switch (role) {
            case 'cs':
                path = '/api/v1/cs/auth/register'
                break
            case 'admin':
                path = '/api/v1/admin/auth/register'
                break
            default:
                path = '/api/v1/user/auth/register'
        }

        if (auth) {
            options = {
                hostname: ipAddress,
                path: path,
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${await getToken()}`
                }
            }
        } else {
            options = {
                hostname: ipAddress,
                path: path,
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                }
            }
        }

        const req = https.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            res.on('data', data => {
                console.log(JSON.parse(data))
            })

            res.on('error', error => {
                console.error(JSON.parse(error))
            })
        })

        req.write(bodyStr)

        req.end()


    } catch (error) {
        console.log(error)
    }
}

const getToken = async () => {
    return await app.auth().currentUser.getIdToken()
}

const getDummy = async () => {
    const http = require('https')

    try {

        const options = {
            hostname: ipAddress,
            path: '/api/v1/admin/dummy',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${await getToken()}`
            }
        }

        const req = http.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            res.on('data', data => {
                console.log(JSON.parse(data))
            })

            res.on('error', error => {
                console.error(JSON.parse(error))
            })
        })


        req.end()


    } catch (error) {
        console.log(error)
    }
}

const submitRecital = async (chapter, verse, submissionType, submissionURL) => {
    const http = require('http')

    try {

        const body = {
            chapter: chapter,
            verse: verse,
            submissionType: submissionType,
            submissionURL: submissionURL
        }

        const bodyStr = JSON.stringify(body)

        const options = {
            hostname: ipAddress,
            port: 3000,
            path: '/api/v1/recital/submit',
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        }

        const req = http.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            res.on('data', data => {
                console.log(JSON.parse(data))
            })

            res.on('error', error => {
                console.error(JSON.parse(error))
            })
        })

        req.write(bodyStr)

        req.end()


    } catch (error) {
        console.log(error)
    }
}

const getRecital = async (id, flag) => {
    const http = require('http')

    try {
        let options

        if (id) {
            options = {
                hostname: ipAddress,
                port: 3000,
                path: `/api/v1/recital/getRecital/${id}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${await getToken()}`
                }
            }
        } else {
            options = {
                hostname: ipAddress,
                port: 3000,
                path: `/api/v1/recital/getRecitals/${flag}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${await getToken()}`
                }
            }
        }

        const req = http.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            res.on('data', data => {
                console.log(JSON.parse(data))
            })

            res.on('error', error => {
                console.error(JSON.parse(error))
            })
        })


        req.end()


    } catch (error) {
        console.log(error)
    }
}

const setReviewedFlag = async (id, flag) => {
    const http = require('http')

    try {

        const options = {
            hostname: ipAddress,
            port: 3000,
            path: `/api/v1/admin/recital/setReviewed/${id}/${flag}`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${await getToken()}`
            }
        }

        const req = http.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            res.on('data', data => {
                console.log(JSON.parse(data))
            })

            res.on('error', error => {
                console.error(JSON.parse(error))
            })
        })

        req.end()


    } catch (error) {
        console.log(error)
    }
}

const getUnreviewedRecital = async (id) => {
    const http = require('http')

    try {
        let options

        if (id) {
            options = {
                hostname: ipAddress,
                port: 3000,
                path: `/api/v1/admin/recital/getRecital/${id}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${await getToken()}`
                }
            }
        } else {
            options = {
                hostname: ipAddress,
                port: 3000,
                path: `/api/v1/admin/recital/getRecitals/`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${await getToken()}`
                }
            }
        }

        const req = http.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            res.on('data', data => {
                console.log(JSON.parse(data))
            })

            res.on('error', error => {
                console.error(JSON.parse(error))
            })
        })


        req.end()


    } catch (error) {
        console.log(error)
    }
}

const getCSProfile = async (id) => {
    const http = require('http')

    try {
        let options

        if (id) {
            options = {
                hostname: ipAddress,
                port: 3000,
                path: `/api/v1/admin/cs/getCSProfile/${id}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${await getToken()}`
                }
            }
        } else {
            options = {
                hostname: ipAddress,
                port: 3000,
                path: `/api/v1/admin/cs/getCSProfiles`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${await getToken()}`
                }
            }
        }

        const req = http.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            res.on('data', data => {
                console.log(JSON.parse(data))
            })

            res.on('error', error => {
                console.error(JSON.parse(error))
            })
        })

        req.end()


    } catch (error) {
        console.log(error)
    }
}

const getMeAdmin = async () => {
    const https = require('https')

    try {
        const options = {
            hostname: ipAddress,
            path: `/api/v1/admin/auth/getMe`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${await getToken()}`
            }
        }

        const req = https.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            res.on('data', data => {
                console.log(JSON.parse(data))
            })

            res.on('error', error => {
                console.error(JSON.parse(error))
            })
        })

        req.end()


    } catch (error) {
        console.log(error)
    }
}

const getMeCS = async () => {
    const http = require('http')

    try {
        const options = {
            hostname: ipAddress,
            port: 3000,
            path: `/api/v1/cs/auth/getMe`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${await getToken()}`
            }
        }

        const req = http.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            res.on('data', data => {
                console.log(JSON.parse(data))
            })

            res.on('error', error => {
                console.error(JSON.parse(error))
            })
        })

        req.end()


    } catch (error) {
        console.log(error)
    }
}

const getMeUser = async () => {
    const http = require('http')

    try {
        const options = {
            hostname: ipAddress,
            port: 3000,
            path: `/api/v1/user/auth/getMe`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${await getToken()}`
            }
        }

        const req = http.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            res.on('data', data => {
                console.log(JSON.parse(data))
            })

            res.on('error', error => {
                console.error(JSON.parse(error))
            })
        })

        req.end()


    } catch (error) {
        console.log(error)
    }
}

const updateMe = async (name, email, languagePref, role) => {
    const http = require('http')

    try {
        let path
        switch (role) {
            case 'cs':
                path = '/api/v1/cs/auth/updateMe'
                break
            case 'admin':
                path = '/api/v1/admin/auth/updateMe'
                break
            default:
                path = '/api/v1/user/auth/updateMe'
        }

        const body = {
            name: name,
            email: email,
            languagePref: languagePref
        }

        const bodyStr = JSON.stringify(body)

        const options = {
            hostname: ipAddress,
            port: 3000,
            path: path,
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        }

        const req = http.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            res.on('data', data => {
                console.log(JSON.parse(data))
            })

            res.on('error', error => {
                console.error(JSON.parse(error))
            })
        })

        req.write(bodyStr)

        req.end()


    } catch (error) {
        console.log(error)
    }
}

const updateMyPassword = async (password, role) => {
    const http = require('http')

    try {
        let path
        switch (role) {
            case 'cs':
                path = '/api/v1/cs/auth/updateMyPassword'
                break
            case 'admin':
                path = '/api/v1/admin/auth/updateMyPassword'
                break
            default:
                path = '/api/v1/user/auth/updateMyPassword'
        }

        const body = {
            password: password
        }

        const bodyStr = JSON.stringify(body)

        const options = {
            hostname: ipAddress,
            port: 3000,
            path: path,
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        }

        const req = http.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            res.on('data', data => {
                console.log(JSON.parse(data))
            })

            res.on('error', error => {
                console.error(JSON.parse(error))
            })
        })

        req.write(bodyStr)

        req.end()


    } catch (error) {
        console.log(error)
    }
}

const submitFeedback = async (id) => {
    const http = require('http')

    try {

        const body = {
            feedback: {
                corrections: [{
                    audioUrl: '/audio1.mp3',
                    timePos: '00:00:04'
                }, {
                    audioUrl: '/audio2.mp3',
                    timePos: '00:00:13'
                }, {
                    audioUrl: '/audio3.mp3',
                    timePos: '00:00:25'
                }]
            }
        }

        const bodyStr = JSON.stringify(body)

        const options = {
            hostname: ipAddress,
            port: 3000,
            path: `/api/v1/recital/submitFeedback/${id}`,
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            }
        }

        const req = http.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            res.on('data', data => {
                console.log(JSON.parse(data))
            })

            res.on('error', error => {
                console.error(JSON.parse(error))
            })
        })

        req.write(bodyStr)

        req.end()


    } catch (error) {
        console.log(error)
    }
}

const getRTBalance = async () => {
    const http = require('http')

    try {
        const options = {
            hostname: ipAddress,
            port: 3000,
            path: `/api/v1/user/getRTBalance`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${await getToken()}`
            }
        }

        const req = http.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            res.on('data', data => {
                console.log(JSON.parse(data))
            })

            res.on('error', error => {
                console.error(JSON.parse(error))
            })
        })

        req.end()


    } catch (error) {
        console.log(error)
    }
}

const deleteMe = async (role) => {
    const http = require('http')

    try {
        let path
        switch (role) {
            case 'cs':
                path = '/api/v1/cs/auth/deleteMe'
                break
            case 'admin':
                path = '/api/v1/admin/auth/deleteMe'
                break
            default:
                path = '/api/v1/user/auth/deleteMe'
        }

        const options = {
            hostname: ipAddress,
            port: 3000,
            path: path,
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${await getToken()}`
            }
        }

        const req = http.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            res.on('data', data => {
                console.log(JSON.parse(data))
            })

            res.on('error', error => {
                console.error(JSON.parse(error))
            })
        })

        req.end()


    } catch (error) {
        console.log(error)
    }
}

const getSubmissionPermission = async () => {
    const http = require('http')

    try {
        const options = {
            hostname: ipAddress,
            port: 3000,
            path: `/api/v1/user/getSubmissionPermission`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${await getToken()}`
            }
        }

        const req = http.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            res.on('data', data => {
                console.log(JSON.parse(data))
            })

            res.on('error', error => {
                console.error(JSON.parse(error))
            })
        })

        req.end()


    } catch (error) {
        console.log(error)
    }
}

const forgotPassword = async (email) => {
    const http = require('http')

    try {

        const options = {
            hostname: ipAddress,
            port: 3000,
            path: `/api/v1/user/auth/forgotPassword/${email}`,
            method: 'POST'
        }

        const req = http.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            res.on('data', data => {
                console.log(JSON.parse(data))
            })

            res.on('error', error => {
                console.error(JSON.parse(error))
            })
        })

        req.end()


    } catch (error) {
        console.log(error)
    }
}

const loginApp = async () => {
    await init()
    loginCheck()

    // User accesses dummy
    // loginUser('dummy', null, null, null, null, null, null, null, 'fab072301@gmail.com', null, null, '1234567890')

    // User retrieves his/her own profile
    // loginUser('getme')

    // User updates his/her profile
    // loginUser('updateme', null, false, null, null, null, null, null, 'Kevin S. Trembley', 'kevinstrembley@dayrep.com', {
    //     ui: 'en',
    //     review: 'my'
    // }, 'user')

    // User updates his/her account profile
    // loginUser('updatemypassword', null, false, null, null, null, null, null, null, null, null, 'user', 'Ohz9ohPhu9')

    // User deletes his/her account
    // loginUser('deleteme', null, false, null, null, null, null, null, null, null, 'user')

    // User submits recital
    // loginUser('submit', null, null, 114, 5, 'shorts', 'recite', '/audio4.mp3')

    // User retrieve a single recital
    // loginUser('retrieve', '60ef30b7c3a4d21d7c549867')

    // User retrieve all recitals with reviewed flag option
    // loginUser('retrieve', null, false)

    // User retrieve his/her ReciteTime balance
    // loginUser('getrtbalance')

    // User retrieve the permission to submit their recitals
    // loginUser('getsubmissionpermission')

    // CS accesses dummy
    // loginCS('dummy', null, 'aminahzulkifli@gmail.com', null, null, '0987654321')

    // CS retrieves his/her own profile
    // loginCS('getme')

    // CS updates his/her profile
    // loginCS('updateme', 'Radeeyah Umayma Mustafa', 'radeeyahumaymamustafa@teleworm.us', {
    //     ui: 'en',
    //     review: 'my'
    // }, 'cs')

    // CS updates his/her account's password
    // loginCS('updatemypassword', null, null, null, 'cs', 'Iev1ujimoon')

    // CS deletes his/her account
    // loginCS('deleteme', null, null, null, 'cs')

    // CS submits his/her feedback of the selected user submission
    // loginCS('submitfeedback', null, null, null, null, null, '60ef30b7c3a4d21d7c549867')

    // Admin registers another admin
    // loginAdmin('register', null, null, 'Naho Nagasawa', 'ramadanrafique@gmail.com', '12340987', 'admin', true, null, 'NahoNagasawa@dayrep.com', 'aiz2Iwie2')

    // Admin accesses dummy
    loginAdmin('dummy', null, null, null, 'NahoNagasawa@dayrep.com', 'aiz2Iwie2')

    // Admin sets recital by ID's reviewed flag 
    // loginAdmin('setreviewed', '60ef3072ced635296c8a26fc', false)

    // Admin retrieves single unreviewed submission by ID
    // loginAdmin('retrieve', '60ee99d0f12d6d6510882958')

    // Admin retrieves all unreviewed submissions
    // loginAdmin('retrieve', null)

    // Admin retrieves single CS profile by ID
    // loginAdmin('getprofilecs', '60ef2c4962b90e4c60bea499')

    // Admin retrieves all CS profiles
    // loginAdmin('getprofilecs', null)

    // Admin retrieves his/her own profile
    // loginAdmin('getme', null, null, null, 'ramadanrafique@gmail.com', '12340987')

    // Admin updates his/her profile
    // loginAdmin('updateme', null, null, 'Chikaya Sahaku', 'chikayasahaku@jourrapide.com', null, 'admin', null, {
    //     ui: 'en',
    //     review: 'my'
    // }

    // Admin updates his/her account's password
    // loginAdmin('updatemypassword', null, null, null, null, 'Ro7aeshie', 'admin')

    setTimeout(() => {
        app.auth().signOut().then(() => {
            console.log('Signed out')
        }).catch(error => {
            console.error(error)
        })
    }, 5000)
}

const forgotPasswordApp = async () => {
    await init()
    forgotPassword('xuehsueh@armyspy.com')
}

const registrationApp = async () => {
    await init()
    
    register('Ramadan bin Rafique', 'ramadanrafique@gmail.com', '12340987', 'user', false)
    // register('Siti Aminah binti Zulkifli', 'aminahzulkifli@gmail.com', '0987654321', 'cs', false)
    // register('Muhammad Fuad bin Abdullah', 'fab072301@gmail.com', '1234567890', 'user', false)
    // register('Najib Iyad Daher', 'NajibIyadDaher@armyspy.com', 'ahrahx3A', 'user', false)
    // register('Majeeda Nazirah Fakhoury', 'MajeedaNazirahFakhoury@dayrep.com', 'Thahfo8aaJ', 'user', false)
}

loginApp()