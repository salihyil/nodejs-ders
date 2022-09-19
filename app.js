import express from 'express';

const app = express();
const port =  3000;

// get'den sonraki ilk parametre root http://localhost:3000/ girince gelecek ekran
// middleware: request ve response arasında kendi özel işlemlerimizin yapılmasını istediğimiz middleware kullanırız.
//nodemon: sunucudaki değişiklikleri otomaik anlıcak ve bizde sunucuyu zırt bırt yeniden başlatmak kurtulcaz.
app.get('/',(request,response)=>{
   response.send('İndex sayfasındasın.')
})

app.listen(port, ()=>{
  console.log(`Application  running on port: ${port}`);
})