package com.youtube.ecommerce.service;

import com.youtube.ecommerce.dao.ProductDao;
import com.youtube.ecommerce.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductDao productDao;

    public Product addNewProduct(Product product){
        return productDao.save(product);
    }

    public Product getProductDetailsById(Integer productId){
        return this.productDao.findById(productId).get();
    }

    public List<Product> getAllProducts(){
        return (List<Product>) this.productDao.findAll();
    }

    public void deleteProductDetails(Integer productId){
        this.productDao.deleteById(productId);
    }
}
