import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import BtnBackToHome from '../../components/BtnBackToHome';
import './styles.css';

export default function GiftList() {
  const [gifts, setGifts] = useState([]);
  const [categories, setCategories] = useState([]);

  function getCategories() {
    api.get('/categories').then((response) => {
      setCategories(response.data);
    });
  }

  function getItems() {
    categories.forEach((category) => {
      api.get(`/items?category=${category.id}`).then((response) => {
        if (!response.data) return;

        const filterGuests = response.data.filter((gift) => gift.guest !== null);
        setGifts(filterGuests);
      });
    });
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (!categories.length) return;
    getItems();
  }, [categories]);

  return (
    <Layout showFooter={false}>
      <div className="card-gift-container">
        <div className="card-gift-content">
          {gifts && gifts.length ? gifts.map((item, index) => {
            const tilt = index % 2 === 0 ? 2.5 : -2.5;

            const randomMovementY = [0, -Math.random() * 5, 0, Math.random() * 5, 0];
            const randomMovementX = [0, -Math.random() * 2.5, 0, Math.random() * 2.5, 0];

            return (
              <motion.div
                key={index}
                className="card-gift"
                initial={{ y: 0, x: 0, rotate: tilt }}
                animate={{
                  y: randomMovementY,
                  x: randomMovementX,
                }}
                transition={{
                  duration: 2.5,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <p>{item.name}</p>
                <span>{item.guest}</span>
              </motion.div>
            );
          }) :
            <div className='card-gift-unavailable'>
              <p>Ainda não tem presentes escolhidos.</p>
              <BtnBackToHome />
            </div>
          }
        </div>
      </div>
    </Layout>
  );
}
