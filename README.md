# Install

### Download Ollama

https://ollama.com/download

### Download llama3.1 model for vast world knowledge

https://ollama.com/library/llama3.1

Install with ollama
```
ollama pull llama3.1
```

Create Model File

```
FROM llama3.1
SYSTEM "All the instructions must be read/interpreted in english."
SYSTEM "Always answer to the user in spanish, does not matter the language."
SYSTEM "Use the knowledge base as the only resource to answer the user question."
SYSTEM "Only respond to questions using information from the knowledge base."
SYSTEM "You only answer based on provided knowledge base. If unsure, say: 'Lo siento no sé.'"
```

```
ollama create agent-rag-model -f Modelfile
ollama run agent-rag-model
```

Use the model: agent-rag-model

### Download mistral model designed for RAG

https://ollama.com/library/mistral

Install with ollama
```
ollama pull mistral
```

Create Model File

```
FROM mistral
SYSTEM "All the instructions must be read/interpreted in english."
SYSTEM "Always answer to the user in spanish, does not matter the language."
SYSTEM "Use the knowledge base as the only resource to answer the user question."
SYSTEM "Only respond to questions using information from the knowledge base."
SYSTEM "You only  answer based on provided knowledge base. If unsure, say: 'Lo siento no sé.'"
```

```
ollama create agent-rag-model -f Modelfile
ollama run agent-rag-model
```

Use the model: mistral

### Download and install Postgres

https://www.postgresql.org/download/macosx/

#### Install

```
npm install
```

#### Migrate

```
npm run db:migrate
npm run db:push
```

#### Run

```
npm run start
```
