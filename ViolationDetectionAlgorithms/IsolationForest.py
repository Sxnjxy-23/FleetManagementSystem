import numpy as np
from sklearn.ensemble import IsolationForest

def gpsinput():
    data = np.array([
        [70, 2.5, 19.1234, 72.5432, 10],  
        [110, 3.8, 18.5432, 71.8943, 23],  
        [60, 1.0, 19.5678, 72.2134, 11],   
        [120, 5.0, 19.3412, 72.9871, 14],  
        [65, 1.2, 18.9872, 71.7654, 9]     
    ])
    return data

def trainisolationforest(data):
    model = IsolationForest(contamination=0.4, random_state=42)  
    model.fit(data)
    return model


def anomalies(model, data):
    predictions = model.predict(data)  
    for i, pred in enumerate(predictions):
        status = "Anomaly" if pred == -1 else "Normal"
        print(f"Data point {i+1}: {data[i]} -> {status}")


input_data = gpsinput() 
model = trainisolationforest(input_data)
anomalies(model, input_data)