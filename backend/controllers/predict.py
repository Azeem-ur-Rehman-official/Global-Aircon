#Import Libraries
import sys
import pickle
import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.svm import LinearSVR

# Load Sample Data
sample_data = pd.read_csv("dataset.csv")

# Splitting Sample Data into Training Data and Testing Data
training_data, testing_data = train_test_split( sample_data , test_size=0.2 , random_state=0 , shuffle = False)


##################################################

############# Predicting Order

##################################################


# Save the Training and Testing Data into CSV File
# Splitting Input Vectors and Outputs / Labels of Training Data
input_vector_train = training_data.iloc[:, 0:3]
output_label_train = training_data.iloc[:,3:4]

# Train the Support Vector Regressor
svr_model = LinearSVR()
svr_model.fit(input_vector_train,np.ravel(output_label_train))

# Save the Trained Models
# Save the Models in a Pkl File
pickle.dump(svr_model, open('svr_trained_model.pkl', 'wb'))

# Splitting Input Vectors and Outputs/Labels of Testing Data
input_vector_test = testing_data.iloc[:, 0:3]
output_label_test = testing_data.iloc[:, 3:4]

# Load the Saved Model
model = pickle.load(open('svr_trained_model.pkl', 'rb'))

# Evaluate the Machine Learning Model
# Provide Test data to the Trained Model
model_predictions = model.predict(input_vector_test)
testing_data.copy(deep=True)
pd.options.mode.chained_assignment = None
testing_data["Predictions"] = np.round(model_predictions,0)

# Save the Predictions into CSV File
testing_data.to_csv('model-predictions.csv', index = False, header = True)
model_predictions = testing_data

# Convert User Input into Feature Vector
user_input = pd.DataFrame({ 'date': [sys.argv[1]],'day': [sys.argv[2]],'month': [sys.argv[3]] })

# Load the Saved Model
model = pickle.load(open('svr_trained_model.pkl', 'rb'))

# Make a Prediction on Unseen Data
predicted_order = model.predict(user_input)




##################################################

############# Predicting Profit

##################################################


# Save the Training and Testing Data into CSV File
# Splitting Input Vectors and Outputs / Labels of Training Data
input_vector_train1 = training_data.iloc[:, 0:4]
output_label_train1 = training_data.iloc[:,6:]

# Train the Support Vector Regressor
svr_model1 = LinearSVR()
svr_model1.fit(input_vector_train1,np.ravel(output_label_train1))

# Save the Trained Models
# Save the Models in a Pkl File
pickle.dump(svr_model1, open('svr_trained_model1.pkl', 'wb'))

# Splitting Input Vectors and Outputs/Labels of Testing Data
input_vector_test1 = testing_data.iloc[:, 0:4]
output_label_test1 = testing_data.iloc[:, 6:]

# Load the Saved Model
model = pickle.load(open('svr_trained_model1.pkl', 'rb'))

# Evaluate the Machine Learning Model
# Provide Test data to the Trained Model
model_predictions = model.predict(input_vector_test1)
testing_data.copy(deep=True)
pd.options.mode.chained_assignment = None
testing_data["Predictions"] = np.round(model_predictions,0)

# Save the Predictions into CSV File
testing_data.to_csv('model-predictions.csv', index = False, header = True)
model_predictions = testing_data

# Convert User Input into Feature Vector
user_input = pd.DataFrame({ 'date': [sys.argv[1]],'day': [sys.argv[2]],'month': [sys.argv[3]], 'orders_count_per_day': predicted_order})

# Load the Saved Model
model = pickle.load(open('svr_trained_model1.pkl', 'rb'))

# Make a Prediction on Unseen Data
predicted_profit = model.predict(user_input)
print(np.round(predicted_profit,0))


