import numpy as np 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sklearn.metrics.pairwise import cosine_similarity
import uvicorn
from pydantic import BaseModel
import json, os
from contant import host, port 

os.environ['KMP_DUPLICATE_LIB_OK']='TRUE'


from processing import (
    get_embedding, 
    load_pretrained, 
    preprocessing, 
    download,
    call_api_get_embedding,
)

model = load_pretrained()

app = FastAPI(
    title="Recommend Music API",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins= ['*'],
    allow_credentials= True, 
    allow_methods= ['*'],
    allow_headers= ['*'],
)

class URL(BaseModel): 
    url: str

class ID(BaseModel):
    id_music: int
    num_music: int 

@app.post('/getembedding', tags=['Get Embedding'])
def getembedding(item: URL):
    dir_data= download(item.url)
    if dir_data: 
        mel_spec= preprocessing(dir_data)
        # embedding= get_embedding(model, mel_spec, rate= item.rate)
        embedding= get_embedding(model, mel_spec)
        os.remove(dir_data)
        return json.dumps(embedding.tolist())


@app.post('/recommend', tags=['Recommend Music with id music'])
def recommend(item: ID):
    music_ids, embeddings= call_api_get_embedding()

    if item.id_music in music_ids: 

        idx= music_ids.index(item.id_music)

        # embedding_normalize= torch.nn.functional.normalize(torch.tensor(embeddings), p= 2, dim= 1)

        similarities= cosine_similarity([embeddings[idx]], embeddings)

        best_idx= np.argsort(similarities)[0][::-1][1:item.num_music + 1]
        
        return [music_ids[i] for i in best_idx]

    else: 
        print('Failed')
        return None

# specify a port

if __name__ == "__main__": 
    uvicorn.run("main:app", host= host, port= port)
