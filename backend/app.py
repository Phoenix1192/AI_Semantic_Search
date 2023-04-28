import os
import pinecone
from sentence_transformers import SentenceTransformer
import torch
from flask import Flask
from flask import jsonify
import sys
app = Flask(__name__)

@app.route('/back/<query>/<number>', methods=['GET', 'POST', 'OPTIONS'])
def my_profile(query,number):
        # get api key from app.pinecone.io
    PINECONE_API_KEY = '45646099-dfd2-478b-9956-7dbd6e9d9d05'
# find your environment next to the api key in pinecone console
    PINECONE_ENV = 'asia-southeast1-gcp'

    pinecone.init(
        api_key=PINECONE_API_KEY,
        environment=PINECONE_ENV
    )

    index_name = 'semantic-search-fast'
    device = 'cuda' if torch.cuda.is_available() else 'cpu'

    model = SentenceTransformer('all-MiniLM-L6-v2', device=device)


    # only create index if it doesn't exist
    if index_name not in pinecone.list_indexes():
        pinecone.create_index(
            name=index_name,
            dimension=model.get_sentence_embedding_dimension(),
            metric='cosine'
        )

    # now connect to the index
    index = pinecone.GRPCIndex(index_name)

    # create the query vector
    xq = model.encode(query).tolist()

    # now query
    number  = int(number)
    xc = index.query(xq, top_k=number, include_metadata=True)
    response_body = []
    v = xc['matches']
    for j in v:
        #print()
        response_body.append(["Sentence: " + j['metadata']['text']+ " : Score is "+str(j['score'])])
    
    return jsonify(data = response_body)
