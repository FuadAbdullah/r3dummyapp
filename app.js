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
                    await updateMyPassword(passwordReg, role)
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

const loginCS = async (flow, name, email, languagePref, role, password, id, emailReg, passwordReg) => {
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
                    await updateMe(name, emailReg, languagePref, role)
                    break
                case 'updatemypassword':
                    await updateMyPassword(passwordReg, role)
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

const loginUser = async (flow, id, flag, chapter, verse, submissionType, submissionURL, name, email, languagePref, role, password, emailReg, passwordReg) => {
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
                    await updateMe(name, emailReg, languagePref, role)
                    break
                case 'updatemypassword':
                    await updateMyPassword(passwordReg, role)
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
    const https = require('https')

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
            path: '/api/v1/recital/submit',
            method: 'POST',
            headers: {
                'content-type': 'application/json',
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

        req.write(bodyStr)

        req.end()


    } catch (error) {
        console.log(error)
    }
}

const getRecital = async (id, flag) => {
    const https = require('https')

    try {
        let options

        if (id) {
            options = {
                hostname: ipAddress,
                path: `/api/v1/recital/getRecital/${id}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${await getToken()}`
                }
            }
        } else {
            options = {
                hostname: ipAddress,
                path: `/api/v1/recital/getRecitals/${flag}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${await getToken()}`
                }
            }
        }

        const req = https.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            let chunk = []
            res.on('data', data => {
                chunk.push(data)
            })
            .on('end', () => {
                let data = Buffer.concat(chunk)
                let readableData = JSON.parse(data)
                console.log(readableData)
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
    const https = require('https')

    try {

        const options = {
            hostname: ipAddress,
            path: `/api/v1/admin/recital/setReviewed/${id}/${flag}`,
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${await getToken()}`
            }
        }

        const req = https.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            let chunk = []
            res.on('data', data => {
                chunk.push(data)
            })
            .on('end', () => {
                let data = Buffer.concat(chunk)
                let readableData = JSON.parse(data)
                console.log(readableData)
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
    const https = require('https')

    try {
        let options

        if (id) {
            options = {
                hostname: ipAddress,
                path: `/api/v1/admin/recital/getRecital/${id}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${await getToken()}`
                }
            }
        } else {
            options = {
                hostname: ipAddress,
                path: `/api/v1/admin/recital/getRecitals/`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${await getToken()}`
                }
            }
        }

        const req = https.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            let chunk = []
            res.on('data', data => {
                chunk.push(data)
            })
            .on('end', () => {
                let data = Buffer.concat(chunk)
                let readableData = JSON.parse(data)
                console.log(readableData)
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
    const https = require('https')

    try {
        let options

        if (id) {
            options = {
                hostname: ipAddress,
                path: `/api/v1/admin/cs/getCSProfile/${id}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${await getToken()}`
                }
            }
        } else {
            options = {
                hostname: ipAddress,
                path: `/api/v1/admin/cs/getCSProfiles`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${await getToken()}`
                }
            }
        }

        const req = https.request(options, (res) => {
            // console.log(req)
            console.log(res.statusCode)

            // Latest way to prevent JSON transmission from failing halfway
            let chunk = []
            res.on('data', data => {
                chunk.push(data)
            })
            .on('end', () => {
                let data = Buffer.concat(chunk)
                let readableData = JSON.parse(data)
                console.log(readableData)
            })
            //////////////////////////////////////////////////////////////

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
    const https = require('https')

    try {
        const options = {
            hostname: ipAddress,
            path: `/api/v1/cs/auth/getMe`,
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

const getMeUser = async () => {
    const https = require('https')

    try {
        const options = {
            hostname: ipAddress,
            path: `/api/v1/user/auth/getMe`,
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

const updateMe = async (name, email, languagePref, role) => {
    const https = require('https')

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
            path: path,
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
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

        req.write(bodyStr)

        req.end()


    } catch (error) {
        console.log(error)
    }
}

const updateMyPassword = async (password, role) => {
    const https = require('https')

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
            path: path,
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
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

        req.write(bodyStr)

        req.end()


    } catch (error) {
        console.log(error)
    }
}

const submitFeedback = async (id) => {
    const https = require('https')

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
            path: `/api/v1/recital/submitFeedback/${id}`,
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
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

        req.write(bodyStr)

        req.end()


    } catch (error) {
        console.log(error)
    }
}

const getRTBalance = async () => {
    const https = require('https')

    try {
        const options = {
            hostname: ipAddress,
            path: `/api/v1/user/getRTBalance`,
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

const deleteMe = async (role) => {
    const https = require('https')

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
            path: path,
            method: 'PUT',
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

const getSubmissionPermission = async () => {
    const https = require('https')

    try {
        const options = {
            hostname: ipAddress,
            path: `/api/v1/user/getSubmissionPermission`,
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

    // Tested
    // User accesses dummy
    // loginUser('dummy', null, null, null, null, null, null, null, 'fab072301@gmail.com', null, null, '1234567890')

    // Tested
    // User retrieves his/her own profile
    // loginUser('getme', null, null, null, null, null, null, null, 'fab072301@gmail.com', null, null, '1234567890')

    // Tested
    // User updates his/her profile
    // loginUser('updateme', null, null, null, null, null, null, 'Muhammad Fuad bin Abdullah', 'fab072301@gmail.com', {
    //     ui: 'en',
    //     review: 'my'
    // }, null, '1234567890', 'fab072301@gmail.com')

    // Tested
    // User updates his/her account's password
    // loginUser('updatemypassword', null, null, null, null, null, null, null, 'fab072301@gmail.com', null, 'user', '0987654321', null, '1234567890')


    // Tested
    // User deletes his/her account
    // loginUser('deleteme', null, null, null, null, null, null, null, 'rukiahhassan@gmail.com', null, 'user', '12340987', null)

    // Tested
    // User submits recital
    // loginUser('submit', null, null, 1, 7, 'fasihFatihah', '/audio1.mp3', null, 'fab072301@gmail.com', null, 'user', '1234567890')

    // Tested
    // User retrieve a single recital
    // loginUser('retrieve', '60f6ccee6dd6af0011b16f13', null, null, null, null, null, null, 'fab072301@gmail.com', null, 'user', '1234567890')

    // Tested
    // User retrieve all recitals with reviewed flag option
    // loginUser('retrieve', null, false, null, null, null, null, null, 'fab072301@gmail.com', null, 'user', '1234567890')

    // Tested
    // User retrieve his/her ReciteTime balance
    // loginUser('getrtbalance', null, null, null, null, null, null, null, 'fab072301@gmail.com', null, 'user', '1234567890')

    // Tested
    // User retrieve the permission to submit their recitals
    // loginUser('getsubmissionpermission', null, null, null, null, null, null, null, 'fab072301@gmail.com', null, 'user', '1234567890')

    // Tested
    // CS accesses dummy
    // loginCS('dummy', null, 'aminahzulkifli@gmail.com', null, null, '0987654321')

    // Tested
    // CS retrieves his/her own profile
    // loginCS('getme', null, 'aminahzulkifli@gmail.com', null, null, '0987654321')

    // Tested
    // CS updates his/her profile
    // loginCS('updateme', 'Siti Aminah binti Zulkifli', 'aminahzulkifli@gmail.com', {
    //     ui: 'en',
    //     review: 'my'
    // }, 'cs', '0987654321', null, 'aminahzulkifli@gmail.com')

    // Tested
    // CS updates his/her account's password
    // loginCS('updatemypassword', null, 'aminahzulkifli@gmail.com', null, 'cs', '1234567890', null, null, '0987654321')

    // CS deletes his/her account
    // loginCS('deleteme', null, null, null, 'cs')

    // Tested
    // CS submits his/her feedback of the selected user submission
    // loginCS('submitfeedback', null, 'aminahzulkifli@gmail.com', null, 'cs', '0987654321', '60f6ccee6dd6af0011b16f13')

    // Tested
    // Admin registers another admin
    // loginAdmin('register', null, null, 'Naho Nagasawa', 'ramadanrafique@gmail.com', '12340987', 'admin', true, null, 'NahoNagasawa@dayrep.com', 'aiz2Iwie2')

    // Tested
    // Admin accesses dummy
    // loginAdmin('dummy', null, null, null, 'NahoNagasawa@dayrep.com', 'aiz2Iwie2')

    // Tested
    // Admin retrieves his/her own profile
    // loginAdmin('getme', null, null, null, 'ramadanrafique@gmail.com', '12340987')

    // Tested
    // Admin updates his/her profile
    // loginAdmin('updateme', null, null, 'Ramadhan bin Rafique', 'ramadanrafique@gmail.com', '12340987', 'admin', null, {
    //     ui: 'en',
    //     review: 'my'
    // })

    // Tested
    // Admin updates his/her account's password
    // loginAdmin('updatemypassword', null, null, null, 'ramadanrafique@gmail.com', '12340987', 'admin', null, null, null, '1337abcd' )

    // Tested however found a bug where unknown ID will still return status 200
    // Admin sets recital by ID's reviewed flag 
    // loginAdmin('setreviewed', '60f71f4ed35a820011b4d291', false, null, 'ramadanrafique@gmail.com', '12340987')

    // Tested
    // Admin retrieves single unreviewed submission by ID
    // loginAdmin('retrieve', '60f71fbcd35a820011b4d294', null, null, 'ramadanrafique@gmail.com', '12340987')

    // Tested
    // Admin retrieves all unreviewed submissions
    // loginAdmin('retrieve', null, null, null, 'ramadanrafique@gmail.com', '12340987')

    // Tested
    // Admin retrieves single CS profile by ID
    // loginAdmin('getprofilecs', '60f71e58d35a820011b4d28a', null, null, 'ramadanrafique@gmail.com', '12340987')

    // Tested
    // Admin retrieves all CS profiles
    // loginAdmin('getprofilecs', null, null, null, 'ramadanrafique@gmail.com', '12340987')

    // IDs
    // 60f71e44d35a820011b4d289 rev
    // 60f71e93d35a820011b4d28c rev
    // 60f71ebdd35a820011b4d28d rev
    // 60f71ee1d35a820011b4d28e rev
    // 60f71f05d35a820011b4d28f rev
    // 60f71f2fd35a820011b4d290 rev
    // 60f71f4ed35a820011b4d291 set true > set false
    // 60f71f74d35a820011b4d292 set true
    // 60f71f9dd35a820011b4d293
    // 60f71fbcd35a820011b4d294

    // Create Recital
    // User submits recital
    // loginUser('submit', null, null, 108, 3, 'surah', '/audio10.mp3', null, 'fab072301@gmail.com', null, 'user', '1234567890')
    // loginUser('submit', null, null, 105, 5, 'shorts', '/audio11.mp3', null, 'rukiahhassan@gmail.com', null, 'user', '12340987')

    // Create Feedback
    // CS submits his/her feedback of the selected user submission
    // loginCS('submitfeedback', null, 'aminahzulkifli@gmail.com', null, 'cs', '0987654321', '60f71f05d35a820011b4d28f')
    // loginCS('submitfeedback', null, 'maimunahosman@gmail.com', null, 'cs', '999987654', '60f71f2fd35a820011b4d290')


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

    // register('Aminah Maimunah Iskandariah binti Osman', 'maimunahosman@gmail.com', '999987654', 'cs', false)
    // register('Nur Rukiah binti Hassan', 'rukiahhassan@gmail.com', '12340987', 'user', false)
    // register('Ramadan bin Rafique', 'ramadanrafique@gmail.com', '12340987', 'user', false)
    // register('Siti Aminah binti Zulkifli', 'aminahzulkifli@gmail.com', '0987654321', 'cs', false)
    // register('Muhammad Fuad bin Abdullah', 'fab072301@gmail.com', '1234567890', 'user', false)
    // register('Najib Iyad Daher', 'NajibIyadDaher@armyspy.com', 'ahrahx3A', 'user', false)
    // register('Majeeda Nazirah Fakhoury', 'MajeedaNazirahFakhoury@dayrep.com', 'Thahfo8aaJ', 'user', false)
}

registrationApp()