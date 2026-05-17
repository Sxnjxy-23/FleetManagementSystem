import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
n=int(input("Enter vehicle speed: "))
data = {
    'speed': [30, 45, 50, 60, 70, 80, 90, 100, 110, 120],
    'violation': [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
}

df = pd.DataFrame(data)

X = df[['speed']]
y = df['violation']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
model = SVC(kernel='linear')
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy:.2f}')


print(classification_report(y_test, y_pred))


print(confusion_matrix(y_test, y_pred))

new_speed = np.array([[n]])  
violation_prediction = model.predict(new_speed)
print(f'Speed {new_speed[0][0]} results in violation: {bool(violation_prediction[0])}')