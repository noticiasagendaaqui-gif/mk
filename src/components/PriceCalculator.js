
import React, { useState, useEffect } from 'react';

const PriceCalculator = () => {
  const [formData, setFormData] = useState({
    serviceType: '',
    area: '',
    frequency: 'unica',
    rooms: '1',
    bathrooms: '1',
    extras: []
  });

  const [price, setPrice] = useState(0);
  const [breakdown, setBreakdown] = useState({});

  const servicePrices = {
    residencial: { base: 80, perM2: 3 },
    comercial: { base: 120, perM2: 4 },
    'pos-obra': { base: 200, perM2: 8 },
    carpetes: { base: 60, perM2: 12 },
    vidros: { base: 40, perM2: 6 }
  };

  const frequencyMultipliers = {
    unica: 1,
    semanal: 0.8,
    quinzenal: 0.85,
    mensal: 0.9
  };

  const extraServices = {
    'limpeza-geladeira': { name: 'Limpeza de Geladeira', price: 30 },
    'limpeza-forno': { name: 'Limpeza de Forno', price: 25 },
    'lavagem-roupas': { name: 'Lavagem de Roupas', price: 40 },
    'organizacao': { name: 'Organização de Ambientes', price: 50 },
    'cera-chao': { name: 'Enceramento do Chão', price: 35 },
    'limpeza-cortinas': { name: 'Limpeza de Cortinas', price: 60 }
  };

  useEffect(() => {
    calculatePrice();
  }, [formData]);

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  const calculatePrice = () => {
    if (!formData.serviceType || !formData.area) {
      setPrice(0);
      setBreakdown({});
      return;
    }

    const service = servicePrices[formData.serviceType];
    const area = parseInt(formData.area) || 0;
    
    let basePrice = service.base;
    let areaPrice = area * service.perM2;
    
    // Ajuste por número de cômodos
    const roomMultiplier = Math.max(1, parseInt(formData.rooms) * 0.1);
    const bathroomMultiplier = Math.max(1, parseInt(formData.bathrooms) * 0.15);
    
    let subtotal = (basePrice + areaPrice) * (1 + roomMultiplier + bathroomMultiplier);
    
    // Aplicar multiplicador de frequência
    const frequencyMultiplier = frequencyMultipliers[formData.frequency];
    subtotal *= frequencyMultiplier;
    
    // Calcular extras
    const extrasTotal = formData.extras.reduce((total, extraId) => {
      return total + (extraServices[extraId]?.price || 0);
    }, 0);
    
    const finalPrice = subtotal + extrasTotal;
    
    setPrice(finalPrice);
    setBreakdown({
      base: basePrice,
      area: areaPrice,
      frequency: frequencyMultiplier,
      extras: extrasTotal,
      subtotal: subtotal,
      total: finalPrice
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'extras') {
      if (checked) {
        setFormData(prev => ({
          ...prev,
          extras: [...prev.extras, value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          extras: prev.extras.filter(extra => extra !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Calculadora de <span className="text-primary-600">Preços</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Calcule o valor estimado do seu serviço de limpeza de forma rápida e fácil
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-secondary-900 mb-6">
              Dados do Serviço
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Tipo de Serviço *
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Selecione o serviço</option>
                  <option value="residencial">Limpeza Residencial</option>
                  <option value="comercial">Limpeza Comercial</option>
                  <option value="pos-obra">Limpeza Pós-Obra</option>
                  <option value="carpetes">Limpeza de Carpetes</option>
                  <option value="vidros">Limpeza de Vidros</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Área Total (m²) *
                </label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Ex: 100"
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Cômodos
                  </label>
                  <select
                    name="rooms"
                    value={formData.rooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Banheiros
                  </label>
                  <select
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {[1,2,3,4,5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Frequência
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="unica">Única vez</option>
                  <option value="semanal">Semanal (20% desconto)</option>
                  <option value="quinzenal">Quinzenal (15% desconto)</option>
                  <option value="mensal">Mensal (10% desconto)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-3">
                  Serviços Extras
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(extraServices).map(([id, service]) => (
                    <label key={id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="extras"
                        value={id}
                        checked={formData.extras.includes(id)}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                      />
                      <span className="text-sm text-secondary-700">
                        {service.name} (+R$ {service.price})
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resultado */}
          <div className="bg-primary-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-secondary-900 mb-6">
              Orçamento Estimado
            </h3>
            
            {price > 0 ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-600 mb-2">
                      R$ {price.toFixed(2)}
                    </div>
                    <p className="text-secondary-600">
                      {formData.frequency !== 'unica' ? `Por ${formData.frequency === 'semanal' ? 'semana' : formData.frequency === 'quinzenal' ? 'quinzena' : 'mês'}` : 'Serviço único'}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-semibold text-secondary-900 mb-4">Detalhamento:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Taxa base:</span>
                      <span>R$ {breakdown.base?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Área ({formData.area}m²):</span>
                      <span>R$ {breakdown.area?.toFixed(2)}</span>
                    </div>
                    {breakdown.extras > 0 && (
                      <div className="flex justify-between">
                        <span>Serviços extras:</span>
                        <span>R$ {breakdown.extras?.toFixed(2)}</span>
                      </div>
                    )}
                    {formData.frequency !== 'unica' && (
                      <div className="flex justify-between text-green-600">
                        <span>Desconto por frequência:</span>
                        <span>-{((1 - frequencyMultipliers[formData.frequency]) * 100).toFixed(0)}%</span>
                      </div>
                    )}
                    <hr className="my-2"/>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span>R$ {price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition-colors">
                    Solicitar Orçamento Oficial
                  </button>
                  <button className="w-full border border-primary-600 text-primary-600 hover:bg-primary-50 py-3 rounded-lg font-medium transition-colors">
                    Agendar Visita Técnica
                  </button>
                </div>

                <div className="text-xs text-secondary-500 text-center">
                  * Valores estimados. Orçamento final sujeito a avaliação técnica.
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <i data-feather="calculator" className="w-16 h-16 text-secondary-300 mx-auto mb-4"></i>
                <p className="text-secondary-500">
                  Preencha os dados ao lado para calcular o orçamento
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
