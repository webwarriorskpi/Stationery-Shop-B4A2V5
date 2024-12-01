import { model, Schema } from 'mongoose';
import { Product } from './stationery.interface';

const productSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: false,
    }
  },
  {
    timestamps: true,
    versionKey:false
  });

export const ProductModel = model<Product>('Product', productSchema);
