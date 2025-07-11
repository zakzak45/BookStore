const express= require('express');
const cors = require('cors');
const app = express();
const PORT =4000;

app.use(cors());
app.use(express.json());


let Books =[]


app.get('/api/books',(req,res)=>{
    res.json(Books);
})


app.post('/api/books',(req, res)=>{
    const{title,author, year}= req.body;
    const newBook ={
        id: Date.now().toString(),
        title,
        author,
        year
    }
    Books.push(newBook);
    res.status(200).json(newBook);
})

app.put('/api/books/:id', (req, res) => {
    const id = req.params.id;
    const { title, author, year } = req.body;
    const book = Books.find(b => b.id === id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    book.title = title;
    book.author = author;
    book.year = year;
    res.json(book);
});


app.delete('/api/books/:id', (req, res) => {
    const id = req.params.id;
    const index = Books.findIndex(b => b.id === id);
    if (index === -1) return res.status(404).json({ error: 'Book not found' });

    Books.splice(index, 1);
    res.json({ message: 'Book deleted' });
});



app.listen(PORT,()=>{
    console.log("server is running in port "+PORT)
})















