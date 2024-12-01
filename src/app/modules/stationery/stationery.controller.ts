import { Request, Response } from 'express';
import { ProductServices } from './stationery.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const result = await ProductServices.createProductIntoDB(productData);

    res.status(200).json({
      message: 'Product created successfully',
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Validation failed',
      success: false,
      Error: err,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  const result = await ProductServices.getAllProductFromDB();
  try {
    res.status(200).json({
      status: true,
      message: 'Products retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      status: false,
      message: 'something went wrong',
      data: {},
    });
  }
};
const getSingleProducts = async (req: Request, res: Response) => {
  try {
    const pID = req.params.productId;
    const result = await ProductServices.getSingleProductFromDB(pID);

    res.status(200).json({
      status: true,
      message: 'Product retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Validation failed',
      success: false,
      Error: err,
    });
  }
};


const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);
    if (result.modifiedCount) {
      res.status(200).json({
        status: true,
        message: 'Product deleted successfully',
        data: {},
      });
    }
    else {
      res.status(500).json({
        status: true,
        message: 'Product delete failed',
      });
    }

  } catch (err) {
    res.status(500).json({
      message: 'something went wrong',
      status: true,
      data: err,
    });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const product = await ProductServices.updateAProductService(productId, updateData);
    if (!product) {
      res.status(404).json({
        message: 'Product not found',
        success: false,
        error: 'Resource not found',
      });
    }
    else {
      res.status(200).json({
        message: 'Product updated successfully',
        status: true,
        data: product,
      });
    }
  } catch (error: any) {
    res.status(404).json({
      message: 'Product not found',
      success: false,
      error: error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProducts,
  deleteProduct,
  updateProduct
};
