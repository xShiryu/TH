var express = require("express")
var mysql = require("mysql")
var app = express()
app.use(express.json())

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yuurei@2803',
    database: 'students'
})

const con2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yuurei@2803',
    database: 'students'
})

con.connect((err) => {
    if(err) {
        console.log(err)
    } else {
        console.log("Connected.")
    }
})

app.get('/getall', (req, res) => {
    con.query('select * from sinhvien', (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
            var value = JSON.parse(JSON.stringify(result))
            console.log(value)
        }
    })
})

app.get('/getbyid', (req, res) => {
    const getmasv = req.body.masv;

    con.query('select * from sinhvien where masv = ?', getmasv, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
            var value = JSON.parse(JSON.stringify(result))
            console.log(value)
        }
    })
})

app.post('/post', (req, res) => {
    const masv = req.body.masv;
    const hoten = req.body.hoten;
    const ngaysinh = req.body.ngaysinh;
    const quequan = req.body.quequan;

    con.query('insert into sinhvien values (?, ?, ?, ?)', [masv, hoten, ngaysinh, quequan], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send("Post success.")
            console.log(result)
            con2.query('select * from sinhvien', (err, result) => {
                if(err) {
                    console.log(err)
                } else {
                    var value = JSON.parse(JSON.stringify(result))
                    console.log(value)
                }
            })
        }
    })
})

app.delete('/delete', (req, res) => {
    const delmasv = req.body.masv;

    con.query('delete from sinhvien where masv = ?', delmasv, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send("Delete success.")
            console.log(result)
            con2.query('select * from sinhvien', (err, result) => {
                if(err) {
                    console.log(err)
                } else {
                    var value = JSON.parse(JSON.stringify(result))
                    console.log(value)
                }
            })
        }
    })
})

app.put('/put', (req, res) => {
    const putmasv = req.body.masv;
    const hoten = req.body.hoten;
    const ngaysinh = req.body.ngaysinh;
    const quequan = req.body.quequan;

    con.query('update sinhvien set hoten = ?, ngaysinh = ?, quequan = ? where masv = ?', [hoten, ngaysinh, quequan, putmasv], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send("Update success.")
            console.log(result)
            con2.query('select * from sinhvien', (err, result) => {
                if(err) {
                    console.log(err)
                } else {
                    var value = JSON.parse(JSON.stringify(result))
                    console.log(value)
                }
            })
        }
    })
})

app.listen(3006, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log("On port 3006")
    }
})