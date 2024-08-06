import sys
import json
import joblib
import numpy as np

# Load the trained model
model = joblib.load('linear_regression_model.pkl')

# Read the input data
input_data = json.loads(sys.argv[1])

# Convert input data to numpy array for prediction
X = np.array([input_data['points'], input_data['rebounds'], input_data['assists']]).reshape(1, -1)

# Make prediction
prediction = model.predict(X)

# Print the result
print(prediction[0])
