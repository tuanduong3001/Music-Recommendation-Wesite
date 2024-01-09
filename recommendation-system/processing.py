import os 
import gdown 
import requests
import torch 
import librosa 
import json
import numpy as np 
import torch.nn as nn 
from model import create_model
from contant import (
    model_url, 
    num_classes,
    url_get_embedding,
)

def load_pretrained(): 
    if not os.path.isfile('pretrained/convnet_audio.pth'):
        print('Install Pretrained!')
        gdown.download(id= model_url, output= 'pretrained/convnet_audio.pth', fuzzy= True)
    
    print('Load Pretrained!')
    model= create_model()
    model.load_state_dict(torch.load('pretrained/convnet_audio.pth', map_location='cpu')['model_state_dict'])
    model = nn.Sequential(*list(model.children())[:-2])

    model.eval() 

    return model 

@torch.jit.script 
def normalize(x):
    """Normalize a matrix x to have values between 0 and 1"""
    x_min = x.min()
    x_max = x.max()
    x_norm = (x - x_min) / (x_max - x_min)
    return x_norm

def preprocessing(dir, sr= 44100): 
    samples, sr= librosa.load(dir, sr= sr)
    samples = samples[:60 * sr]
    mel= librosa.feature.melspectrogram(y= samples, sr= sr, n_mels= 128)
    mel= librosa.amplitude_to_db(mel)
    mel= normalize(torch.as_tensor(mel)).numpy()

    feature= librosa.util.frame(mel, frame_length= 128, hop_length= 64).T
    return feature

def get_embedding(model, x): 
    print(x.shape)
    x = torch.as_tensor(x).unsqueeze(1)
    with torch.no_grad(): 
        output= model(x)
    
    return output.mean(0)

def download(link):
    response= requests.get(link)
    if response.status_code == 200: 
        filename= os.path.basename(link)
        print(f'Installing {filename}')
        with open('data/' + filename, 'wb') as f:
            f.write(response.content)

        return 'data/' + filename
    else: 
        print('Cannot Install')
        return None

def call_api_get_embedding():
    url= f'{url_get_embedding}/api/admin/embedding?page=1&limit=10000'
    response= requests.get(url)
    if response.status_code == 200: 
        print('Query all embedding') 

        data= json.loads(response.content)['data']
        get_musicId = lambda x: x['musicId']
        get_embedding= lambda x: json.loads(x['embedding'])

        musicIDs= list(map(get_musicId, data))
        embeddings= list(map(get_embedding, data))

        return musicIDs, embeddings
    else: 
        print('Cannot query all embedding')
        return None, None

