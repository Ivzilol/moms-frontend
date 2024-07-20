import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="card-title">{order.orderDescription}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Дата на Доставка: {new Date(order.deliveryDate).toLocaleString()}</h6>
      </div>
      <div className="card-body">
        <p className="card-text">
          <strong>Създаден от:</strong> {order.creator}
        </p>
        {isExpanded && (
          <>
            <p className="card-text">
              <strong>Обект:</strong><br />
              Име: {order.constructionSite.name}<br />
              номер: {order.constructionSite.constructionNumber}
            </p>
            <p className="card-text">
              <strong>Вид Материал:</strong> {order.materialType}
            </p>
            <p className="card-text">
              <strong>Файл със Спецификации:</strong> <a href={order.specificationFileUrl} target="_blank" rel="noopener noreferrer">Виж Файла</a>
            </p>
            <h6 className="card-subtitle mb-2 text-muted">Fasteners</h6>
            <ul className="list-group list-group-flush">
              {order.fasteners.map((fastener, index) => (
                <li key={index} className="list-group-item">
                  <strong>Тип:</strong> {fastener.type}<br />
                  <strong>Диаметър:</strong> {fastener.diameter}<br />
                  {fastener.length && <><strong>Дължина:</strong> {fastener.length}<br /></>}
                  <strong>Модел:</strong> {fastener.model}<br />
                  <strong>Клас:</strong> {fastener.clazz}<br />
                  <strong>Количество:</strong> {fastener.quantity}
                </li>
              ))}
            </ul>
          </>
        )}
        <button onClick={toggleExpand} className="btn btn-primary mt-3">
          {isExpanded ? 'Затвори' : 'Детайли'}
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
