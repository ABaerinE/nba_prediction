import sys
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import Ridge

# Read the input data

file_path = sys.argv[1]
initial_data = pd.read_json(file_path)
initial_data = initial_data.drop(['player', 'team', 'game', 'pos', 'min', 'pFouls', 'steals', 'turnovers', 'blocks', 'plusMinus', 'comment'], axis = 1)
initial_data.dropna(inplace=True)
initial_data.reset_index(drop=True, inplace=True)

last_5_games_avg = initial_data.rolling(window=5).agg('mean')
last_5_games_avg = last_5_games_avg.add_prefix("last_5_avg_")
last_5_games_avg.dropna(inplace=True)
last_5_games_avg.reset_index(drop=True, inplace=True)

new_df = initial_data.iloc[5:]
new_df.reset_index(drop=True, inplace=True)

if new_df.shape[0] > last_5_games_avg.shape[0]:
    new_df = new_df[:-1]
else:
    last_5_games_avg = last_5_games_avg[:-1]

new_df = new_df[['points', 'totReb', 'assists']]
df = pd.concat([last_5_games_avg, new_df], axis = 1)

X = df.iloc[:, :-3]
y = df.iloc[:, -3:]

pipeline = Pipeline([
    ('scaler', StandardScaler()),  # Feature scaling
    ('model', Ridge(alpha=2))    # Ridge Regression with regularization
])
pipeline.fit(X, y)

# Convert input data to numpy array for prediction
X_pred = X.iloc[-1:]

# Make prediction
prediction = pipeline.predict(X_pred)

# Print the result
print(prediction)
