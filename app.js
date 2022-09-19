import express from 'express';

const app = express();
const port = 3000;

// ejs template engine
app.set('view engine', 'ejs');

// static files middleware
app.use(express.static('public'));

// get'den sonraki ilk parametre root http://localhost:3000/ girince gelecek ekran
// middleware: request ve response arasında kendi özel işlemlerimizin yapılmasını istediğimiz middleware kullanırız.
//nodemon: sunucudaki değişiklikleri otomaik anlıcak ve bizde sunucuyu zırt bırt yeniden başlatmak kurtulcaz.
app.get('/', (request, response) => {
    response.render('index');
});

app.get('/about', (request, response) => {
    response.render('about');
});

app.get('/blog', (request, response) => {
    response.render('blog');
});

app.listen(port, () => {
    console.log(`Application  running on port: ${port}`);
});
