import { useEffect, useRef, useState } from 'react';
import {
  Body,
  BurgerIcon,
  BurgerIconExit,
  SideBarContainer,
  Span,
  Stars,
  Stars2,
  Stars3,
  StarsWrapper,
  TextContainer,
  Title,
} from './MelyaPage.styled';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import bez_glaz from '../../image/bez_glaz.svg';
import glaza from '../../image/gla3a.svg';
import styled, { keyframes } from 'styled-components';
import LoremText from './LoremText/LoremText';

const MelyaPage = () => {
  const container = useRef();
  const { contextSafe } = useGSAP({ scope: container });
  const [sidebarSwitcher, setSidebarSwitcher] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const text = 'CODEBEARS CODEBEARS CODEBEARS ';
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    // Устанавливаем начальное состояние меню (спрятано)
    gsap.set('.sideMenu', { x: '-100vw' });
  }, []);

  const onClickGood = () => {
    // Переключение состояния меню
    if (!sidebarSwitcher) {
      // Меню открывается
      gsap.to('.sideMenu', {
        x: 0,
        duration: 0.4, // Уменьшаем длительность для мгновенности
        opacity: 1,
      });
      setSidebarSwitcher(!sidebarSwitcher);
    } else {
      // Меню закрывается
      gsap.to('.sideMenu', {
        x: '-100vw',
        duration: 0.4, // Уменьшаем длительность для мгновенности
        opacity: 0,
      });
      setSidebarSwitcher(!sidebarSwitcher);
    }
  };

  useEffect(() => {
    const handleMouseMove = e => {
      // Центр экрана (или центра контейнера глаз)
      const eyeCenterX = window.innerWidth / 2;
      const eyeCenterY = window.innerHeight / 2;

      // Координаты мыши относительно центра глаз
      const mouseX = e.clientX - eyeCenterX;
      const mouseY = e.clientY - eyeCenterY;

      // Устанавливаем ограничение движения глаз
      const maxDistance = 10; // Максимальное смещение глаз в пикселях
      const distance = Math.sqrt(mouseX ** 2 + mouseY ** 2); // Длина вектора до мыши

      // Нормализуем движение, чтобы не выходить за пределы maxDistance
      const scale = Math.min(maxDistance / distance, 1);

      setOffset({
        x: mouseX * scale,
        y: mouseY * scale,
      });
    };

    // Добавляем глобальный обработчик мыши
    window.addEventListener('mousemove', handleMouseMove);

    // Удаляем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleScroll = e => {
      const scrollSpeed = e.deltaY;

      // Определяем направление скроллинга
      setScrollDirection(scrollSpeed > 0 ? 'down' : 'up');

      // Анимация для логотипа и текста
      if (scrollDirection === 'down') {
        gsap.to('.title', {
          y: '-100vh',
          duration: 0.9, // Уменьшаем длительность для мгновенности
        });
        gsap.to('.text-block', {
          opacity: 1,
          y: '0',
          duration: 0.4, // Уменьшаем длительность для мгновенности
        });
      } else if (scrollDirection === 'up') {
        gsap.to('.title', {
          y: '0',
          duration: 0.9, // Уменьшаем длительность для мгновенности
        });
        gsap.to('.text-block', {
          opacity: 0,
          y: '100vh',
          duration: 0.4, // Уменьшаем длительность для мгновенности
        });
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [scrollDirection]);

  return (
    <StarsWrapper ref={container}>
      <BurgerIcon onClick={() => onClickGood()} className="good" />
      <Stars id="stars" />
      <Stars2 id="stars2" />
      <Stars3 id="stars3" />
      <Title id="title" className="face-container title">
        <img
          src={bez_glaz}
          alt="Face"
          style={{
            display: 'block',
          }}
        />
        {/* Глаза */}
        <img
          src={glaza}
          alt="Eyes"
          style={{
            position: 'absolute',
            transform: `translate(0, 0) translate(${offset.x}px, ${offset.y}px)`,
            transition: 'transform 0.15s ease-out',
          }}
        />
        <Body style={{ position: 'absolute' }}>
          <TextContainer>
            {text.split('').map((char, index) => (
              <Span key={index} angle={index * (360 / text.length)}>
                {char}
              </Span>
            ))}
          </TextContainer>
        </Body>
      </Title>
      <div
        className="text-block"
        style={{
          opacity: 0,
          transform: 'translateY(100vh)',
          backgroundColor: 'rgba(128, 128, 128, 0.8)',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          transition: 'opacity 0.1s ease, transform 0.1s ease',
        }}
      >
        <LoremText />
      </div>
      <SideBarContainer className="sideMenu">
        Side Menu
        <BurgerIconExit onClick={() => onClickGood()} />
      </SideBarContainer>
    </StarsWrapper>
  );
};

export default MelyaPage;
