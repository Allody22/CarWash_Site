import React, {useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import '../css/CreatingOrder.css';
import Modal from "react-bootstrap/Modal";
import {InputNumber} from 'rsuite';
import InputField from "../components/InputField";
import DataField from "../components/DataField";
import {SERVICE_TYPE} from "../components/Enum";
import {getPrice, login} from "../http/userAPI";
import {ADMIN_ROUTE} from "../utils/consts";

// if (item === 'Турбо сушка кузова') {
//     orderName = 'TURBO_DRYING';
// } else if (item === 'Продувка кузова') {
//     orderName = 'BODY_BLOW';
// } else if (item === 'Продувка замков, зеркала') {
//     orderName = 'LOCKS_AND_MIRRORS_BLOW';
// } else if (item === 'Обработка силиконом') {
//     orderName = 'SILICONE_TREATMENT';
// } else if (item === 'Обработка замков жидкостью') {
//     orderName = 'LOCK_FLUID_TREATMENT';
// } else if (item === 'Обработка кожи кондиционером 1 эл.') {
//     orderName = 'LEATHER_CONDITIONER_TREATMENT';
// } else if (item === 'Полироль пластика салона') {
//     orderName = 'SALON_PLASTIC_POLISH';
// } else if (item === 'Полироль пластика панель') {
//     orderName = 'PANEL_PLASTIC_POLISH';
// } else if (item === 'Полироль пластика багажник') {
//     orderName = 'TRUNK_PLASTIC_POLISH';
// } else if (item === 'Наружная мойка радиатора') {
//     orderName = 'RADIATOR_WASH';
// } else if (item === 'Чернение шин 4') {
//     orderName = 'TIRE_BLACKENING';
// } else if (item === 'Озонирование салона 30 мин.') {
//     orderName = 'SALON_OZONATION';
// } else if (item === 'Очистка битумных пятен кузов') {
//     orderName = 'CLEANING_BITUMEN_STAINS_BODY';
// } else if (item === 'Покрытие лобового стекла Nano Glass 1 эл.') {
//     orderName = 'WINDSHIELD_NANO_GLASS_COATING';
// } else if (item === 'Покрытие бокового стекла Nano Glass 1 эл.') {
//     orderName = 'SIDE_GLASS_NANO_GLASS_COATING';
// } else if (item === 'Комплекс всех стёкол') {
//     orderName = 'COMPLEX_ALL_GLASSES';
// } else if (item === 'Диэлектрическая химчистка двигателя') {
//     orderName = 'ENGINE_CHEMICAL_CLEANING';
// } else if (item === 'Химчистка дисков 4 шт.') {
//     orderName = 'DISC_CHEMICAL_CLEANING';
// } else if (item === 'Химчистка багажника') {
//     orderName = 'TRUNK_CHEMICAL_CLEANING';
// } else if (item === 'Химчистка двери 1 эл.') {
//     orderName = '"DOOR_CHEMICAL_CLEANING';
// } else if (item === 'Химчистка кресло (текстиль) 1 эл.') {
//     orderName = 'TEXTILE_SEAT_CHEMICAL_CLEANING';
// } else if (item === 'Химчистка кресло (кожа) 1 эл.') {
//     orderName = 'LEATHER_SEAT_CHEMICAL_CLEANING';
// } else if (item === 'Химчистка передней панели') {
//     orderName = 'FRONT_PANEL_CHEMICAL_CLEANING';
// } else if (item === 'Химчистка пола') {
//     orderName = 'FLOOR_CHEMICAL_CLEANING';
// } else if (item === 'Химчистка потолка') {
//     orderName = 'CEILING_CHEMICAL_CLEANING';
// } else if (item === 'Однофазная мойка с химией без протирки') {
//     orderName = 'ONE_PHASE_WASH_WITH_CHEMICALS_NO_WIPING';
// } else if (item === 'Мойка кузова 2 фазы с протиркой') {
//     orderName = 'TWO_PHASE_WASH_WITH_WIPING';
// } else if (item === 'Мойка кузова 2 фазы без протирки') {
//     orderName = 'TWO_PHASE_WASH_NO_WIPING';
// } else if (item === 'Мойка комплекс (кузов 1 фазы + салон)') {
//     orderName = 'COMPLEX_WASH_1_PHASES_SALON';
// } else if (item === 'Мойка комплекс (кузов 2 фазы + салон)') {
//     orderName = 'COMPLEX_WASH_1_PHASES_SALON';
// } else if (item === 'Мойка комплекс (кузов 2 фазы + салон)') {
//     orderName = 'COMPLEX_WASH_2_PHASES_SALON';
// } else if (item === 'Покрытие кварцевой защитой') {
//     orderName = 'QUARTZ_COATING';
// } else if (item === 'Мойка двигателя с хим. раствором + сушка') {
//     orderName = 'ENGINE_WASH_WITH_CHEMICALS_AND_DRYING';
// } else if (item === 'Очистка арок колес') {
//     orderName = 'WHEEL_ARCHES_CLEANING';
// } else if (item === 'Уборка багажника') {
//     orderName = 'TRUNK_CLEANING';
// } else if (item === 'Влажная уборка салона') {
//     orderName = 'INNER_WET_CLEANING';
// } else if (item === 'Влажная уборка передней панели') {
//     orderName = 'FRONT_PANEL_WET_CLEANING';
// } else if (item === 'Пылесос салона') {
//     orderName = 'VACUUM_CLEANING_SALON';
// } else if (item === 'Пылесос пола') {
//     orderName = 'VACUUM_CLEANING_FLOOR';
// } else if (item === 'Пылесос ковриков') {
//     orderName = 'VACUUM_CLEANING_CARPETS';
// } else if (item === 'Коврик багажников') {
//     orderName = 'CARGO_MAT';
// } else if (item === 'Резиновый коврик 1 шт.') {
//     orderName = 'RUBBER_MAT_1';
// } else if (item === 'Стирка текстильного коврика 1 шт.') {
//     orderName = 'TEXTILE_MAT_WASH';
// } else if (item === 'Чистка стёкол с 2х сторон') {
//     orderName = 'GLASS_CLEANING_2_SIDES';
// } else if (item === 'Чистка стёкол внутри салона') {
//     orderName = 'INNER_GLASS_CLEANING';
// } else if (item === 'Чистка ветрового стекла') {
//     orderName = 'WINDSHIELD_CLEANING';
// } else if (item === 'Полировка восстановительная') {
//     orderName = 'POLISHING_RESTORATION';
// } else if (item === 'Глубокая абразивная полировка') {
//     orderName = 'DEEP_ABRASIVE_POLISHING';
// } else if (item === 'Полировка фар 1 шт') {
//     orderName = 'HEADLINE_POLISHING';
// } else if (item === 'Полимер Sonax до 6 месяцев') {
//     orderName = 'PROFESSIONAL_SONIX_POLYMER_COATING';
// } else if (item === 'Кварцекерамическое покрытие CAN COAT до 6 месяцев') {
//     orderName = 'PROFESSIONAL_QUARTZ_CERAMIC_COATING';
// } else if (item === 'Koch Chemie 1K-NANO 1 год') {
//     orderName = 'PROFESSIONAL_KOCH_CHEMIE_1K_NANO';
// } else if (item === 'Профессиональное покрытие керамика (2 слоя + 1 слой) до 3 лет') {
//     orderName = 'PROFESSIONAL_CERAMIC_COATING_2_LAYERS_ONE_LAYER';
// } else {
//     orderName = 'ERROR'
// }


const CreatingOrder = () => {
    const [itemsCount, setItemsCount] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const allItems = ['Турбо сушка кузова', 'Продувка кузова', "Обработка силиконом",
        'Продувка замков, зеркала', 'Обработка кожи кондиционером 1 эл.', 'Обработка замков жидкостью',
        'Полироль пластика салона', "Полироль пластика панель", "Полироль пластика багажник",
        "Наружная мойка радиатора", "Чернение шин 4", "Озонирование салона 30 мин.",
        "Очистка битумных пятен кузов", "Покрытие лобового стекла Nano Glass 1 эл.",
        "Покрытие бокового стекла Nano Glass 1 эл.", "Комплекс всех стёкол",
        "Диэлектрическая химчистка двигателя",
        "Химчистка дисков 4 шт.", "Химчистка багажника", "Химчистка двери 1 эл.",
        "Химчистка кресло (текстиль) 1 эл.", "Химчистка кресло (кожа) 1 эл.",
        "Химчистка передней панели", "Химчистка пола", "Химчистка потолка",
        "Однофазная мойка с химией без протирки", "Мойка кузова 2 фазы с протиркой",
        "Мойка кузова 2 фазы без протирки", "Мойка комплекс (кузов 1 фазы + салон)",
        "Мойка КОМЛПЕКС (кузов 2 фазы + салон)", "Покрытие кварцевой защитой",
        "Мойка двигателя с хим. раствором + сушка", "Очистка арок колес",
        "Уборка багажника", "Влажная уборка салона", "Влажная уборка передней панели",
        "Пылесос салона", "Пылесос пола", "Пылесос ковриков", "Коврик багажников",
        "Резиновый коврик 1 шт.", "Стирка текстильного коврика 1 шт.",
        "Чистка стёкол с 2х сторон", "Чистка стёкол внутри салона",
        "Чистка ветрового стекла", "Полировка восстановительная",
        "Глубокая абразивная полировка", "Полировка фар 1 шт",
        "Полимер Sonax до 6 месяцев", "Кварцекерамическое покрытие CAN COAT до 6 месяцев",
        "Koch Chemie 1K-NANO 1 год", "Профессиональное покрытие керамика (2 слоя + 1 слой) до 3 лет",
    ];
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const styles = {marginBottom: 10};
    const [price, setPrice] = useState(0);
    const [orderTime, setOrderTime] = useState(0);
    const [startTime, setStartTime] = useState(new Date());
    const [carNumber, setCarNumber] = useState('');
    const [carType, setCarType] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [comments, setComments] = useState('');

    const handleCountChange = (item, value) => {
        setItemsCount((prevItemsCount) => ({
            ...prevItemsCount,
            [item]: value,
        }));

        setSelectedItems((prevSelectedItems) => {
            const itemIndex = prevSelectedItems.indexOf(item);
            let newSelectedItems = [...prevSelectedItems];

            if (value > 0 && itemIndex < 0) {
                newSelectedItems.push(item);
            } else if (value === 0 && itemIndex >= 0) {
                newSelectedItems.splice(itemIndex, 1);
            }
            console.log(newSelectedItems)
            setSelectedItems(newSelectedItems)
            return newSelectedItems;
        });

    }

    const getPriceAndTime = async (e) => {
        e.preventDefault();
        try {
            const data = await getPrice(selectedItems, carType);
            const { price, time } = data;

            // установить полученные значения в переменные состояния
            setPrice(price);
            setOrderTime(time);

            console.log(data);
        } catch (error) {
            console.log(error);
            console.log(price, orderTime);
            alert('Произошла ошибка. Пожалуйста, повторите попытку позже.');
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log({name, carNumber, carType, specialist, enSelectedItems});
        // ваша логика обработки нажатия на кнопку
    };


    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Button className='full-width' variant='secondary' onClick={handleOpenModal}>
                Выберите услуги
            </Button>
            <Modal show={showModal} onHide={handleCloseModal} className='my-custom-class'>
                <Modal.Header closeButton>
                    <Modal.Title>Выберите заказы</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {allItems.sort().map(item => (
                        <div key={item}>
                            <span className='text'>{item}</span>
                            <InputNumber
                                size="md"
                                style={styles}
                                min={0}
                                onChange={value => handleCountChange(item, value)}
                                value={itemsCount[item] || 0}
                            />
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCloseModal}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            {selectedItems.filter(item => itemsCount[item] > 0).length > 0 && (
                <div className='selected-items-container'>
                    <Form.Label>Выбранные заказы:</Form.Label>
                    <div className='selected-items'>
                        {selectedItems.map(item => {
                            if (itemsCount[item] > 0) {
                                return (
                                    <span key={item} className='item'>
              {`${item} (${itemsCount[item]})`}
            </span>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            )}

            <Form onSubmit={getPriceAndTime}>
                <InputField
                    label='Тип кузова:'
                    id='carType'
                    value={carType}
                    onChange={setCarType}
                />
                <div className='submit-container'>
                    <Button className='btn-submit' variant='primary' type='submit'>
                        Посчитать цену и время
                    </Button>
                </div>
            </Form>

            <div className="label-container">
                <div className="price-label">Цена услуг: {price}</div>
                <div className="order-time-label">Время выполнения: {orderTime}</div>
            </div>

            <Form onSubmit={handleSubmit}>
                <InputField
                    label='Имя и фамилия:'
                    id='name'
                    value={name}
                    onChange={setName}
                />
                <InputField
                    label='Номер автомобиля:'
                    id='carNumber'
                    value={carNumber}
                    onChange={setCarNumber}
                />
                <InputField
                    label='Тип кузова:'
                    id='carType'
                    value={carType}
                    onChange={setCarType}
                />
                <InputField
                    label='Специалист:'
                    id='specialist'
                    value={specialist}
                    onChange={setSpecialist}
                />
                <InputField
                    label='Комментарии:'
                    id='comments'
                    value={comments}
                    onChange={setComments}
                />
                <DataField
                    id='startTime'
                    value={startTime}
                    onChange={setStartTime}
                />
                <div className='submit-container'>
                    <Button className='btn-submit' variant='primary' type='submit'>
                        Отправить
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default CreatingOrder;