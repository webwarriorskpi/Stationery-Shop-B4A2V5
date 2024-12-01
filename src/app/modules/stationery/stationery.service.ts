import { ProductModel } from './stationery.model';
import { Product } from './stationery.interface';

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};
const getSingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.findOne({ _id: productId });
  return result;
};

const updateAProductService = async (productId: string, updateData: Product) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true, // Ensure data validation
    });

    return updatedProduct;
  } catch (error) {
    // throw new Error(`Failed to update product: ${error.message}`);
  }
};
const deleteProductFromDB = async (productId: string) => {
  const result = await ProductModel.updateOne({ _id: productId }, { isDeleted: true });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
  updateAProductService

};
