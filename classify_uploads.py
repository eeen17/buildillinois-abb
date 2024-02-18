import pickle
import torch
from torch.utils.data import Dataset
from tqdm import tqdm
import numpy as np

# device = torch.device('mps')
model = pickle.load(open('model.pkl', 'rb'))
    
# print(model('./upload/Logo.png'))

# class PlantDataset(Dataset):
#     def __init__(self, data_dir, arr):
#         # initialize some valuess
#         self.data_dir = data_dir
#         self.data = [x[0] for x in arr]

#         #apply augment and transforms
#         self.arr = self.augment(arr, self.augments, self.transform, data_dir) 

# train_dataset = PlantDataset('./upload')
# train_loader = torch.utils.data.DataLoader(train_dataset, batch_size = 1, shuffle = False)

# for images, labels in tqdm(train_loader):
#     images = images.to(device)
#     # labels = labels.float().to(device) # don't need this cuz we not training no more

#     # making classifications and deriving indices of maximum value via argmax (which gives the max value i the tensor)
#     solution_tensor = model(images)
#     classifications = torch.argmax(solution_tensor, dim = 1).item()

#     #undoing one-hot encoding to get label value as a number
#     label = np.where(labels.numpy() == 1)[1]
    
    
#     solution_tensor = model(images)
#     classifications = torch.argmax(solution_tensor, dim = 1).item()
#     correct_predictions = int(classifications==label)