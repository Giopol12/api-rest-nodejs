import fastify from 'fastify'

const app = fastify()

app.get('/hello',(req,res)=>{
    return 'Hello world'
})

app.listen(3333)