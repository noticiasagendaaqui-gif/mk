
// Serviço de Email usando Titan Email (HostGator)
class EmailService {
  constructor() {
    this.config = {
      host: 'smtp.titan.email',
      port: 465,
      secure: true, // SSL/TLS
      auth: {
        user: 'admin@agendaaqui.online',
        pass: 'Liz@2023'
      }
    };
  }

  // Simular envio de email (em produção seria integrado com backend)
  async sendEmail(to, subject, content, type = 'html') {
    try {
      // Simular delay de envio
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const emailData = {
        from: 'admin@agendaaqui.online',
        to: to,
        subject: subject,
        content: content,
        type: type,
        timestamp: new Date().toISOString(),
        status: 'enviado'
      };

      // Salvar log do email enviado
      this.saveEmailLog(emailData);
      
      console.log(`Email enviado para ${to}: ${subject}`);
      return { success: true, data: emailData };
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      return { success: false, error: error.message };
    }
  }

  saveEmailLog(emailData) {
    const logs = JSON.parse(localStorage.getItem('emailLogs') || '[]');
    logs.unshift(emailData);
    // Manter apenas os últimos 100 logs
    if (logs.length > 100) {
      logs.splice(100);
    }
    localStorage.setItem('emailLogs', JSON.stringify(logs));
  }

  getEmailLogs() {
    return JSON.parse(localStorage.getItem('emailLogs') || '[]');
  }

  // Email de boas-vindas para novos usuários
  async sendWelcomeEmail(userEmail, userName) {
    const subject = 'Bem-vindo ao AgendaAqui!';
    const content = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4F46E5;">AgendaAqui</h1>
          <h2 style="color: #333;">Bem-vindo, ${userName}!</h2>
        </div>
        
        <div style="background-color: #f8fafc; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            Obrigado por se cadastrar no AgendaAqui! Estamos muito felizes em tê-lo(a) conosco.
          </p>
          
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            Agora você pode agendar serviços de limpeza profissional com facilidade e acompanhar todos os seus agendamentos em um só lugar.
          </p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h3 style="color: #333;">O que você pode fazer agora:</h3>
          <ul style="color: #555; line-height: 1.8;">
            <li>Agendar seu primeiro serviço de limpeza</li>
            <li>Explorar nossos diferentes tipos de serviços</li>
            <li>Calcular preços online</li>
            <li>Acompanhar seus agendamentos no painel do cliente</li>
            <li>Participar do programa de fidelidade</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background-color: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Fazer Primeiro Agendamento
          </a>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; color: #666; font-size: 14px;">
          <p>Se você tiver alguma dúvida, entre em contato conosco:</p>
          <p>📧 admin@agendaaqui.online</p>
          <p>📱 WhatsApp: (31) 99999-9999</p>
        </div>
      </div>
    `;
    
    return await this.sendEmail(userEmail, subject, content);
  }

  // Email de confirmação de agendamento
  async sendBookingConfirmation(userEmail, bookingData) {
    const subject = `Agendamento Confirmado - ${bookingData.service}`;
    const content = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4F46E5;">AgendaAqui</h1>
          <h2 style="color: #10B981;">Agendamento Confirmado!</h2>
        </div>
        
        <div style="background-color: #f0fdf4; border: 2px solid #10B981; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
          <h3 style="color: #065f46; margin-top: 0;">Detalhes do Agendamento:</h3>
          <p><strong>Serviço:</strong> ${bookingData.service}</p>
          <p><strong>Data:</strong> ${new Date(bookingData.date).toLocaleDateString('pt-BR')}</p>
          <p><strong>Horário:</strong> ${bookingData.time}</p>
          <p><strong>Endereço:</strong> ${bookingData.address}</p>
          <p><strong>Valor:</strong> R$ ${bookingData.value?.toFixed(2)}</p>
        </div>
        
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h4 style="color: #92400e; margin-top: 0;">Instruções Importantes:</h4>
          <ul style="color: #92400e; margin: 0;">
            <li>Certifique-se de que alguém esteja presente no local</li>
            <li>Deixe as áreas acessíveis para nossa equipe</li>
            <li>Em caso de cancelamento, avise com 24h de antecedência</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #666;">Acompanhe seu agendamento no painel do cliente</p>
          <a href="#" style="background-color: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Ver Meus Agendamentos
          </a>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; color: #666; font-size: 14px;">
          <p>Dúvidas? Entre em contato:</p>
          <p>📧 admin@agendaaqui.online | 📱 (31) 99999-9999</p>
        </div>
      </div>
    `;
    
    return await this.sendEmail(userEmail, subject, content);
  }

  // Email de lembrete de agendamento
  async sendBookingReminder(userEmail, bookingData) {
    const subject = `Lembrete: Serviço agendado para amanhã`;
    const content = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4F46E5;">AgendaAqui</h1>
          <h2 style="color: #F59E0B;">Lembrete de Agendamento</h2>
        </div>
        
        <div style="background-color: #fef3c7; border-left: 4px solid #F59E0B; padding: 25px; margin-bottom: 25px;">
          <p style="color: #92400e; font-size: 18px; margin: 0;">
            <strong>Seu serviço está agendado para amanhã!</strong>
          </p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">Detalhes:</h3>
          <p><strong>Serviço:</strong> ${bookingData.service}</p>
          <p><strong>Data:</strong> ${new Date(bookingData.date).toLocaleDateString('pt-BR')}</p>
          <p><strong>Horário:</strong> ${bookingData.time}</p>
          <p><strong>Endereço:</strong> ${bookingData.address}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background-color: #10B981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Ver Detalhes
          </a>
        </div>
      </div>
    `;
    
    return await this.sendEmail(userEmail, subject, content);
  }

  // Email de orçamento
  async sendQuote(userEmail, quoteData) {
    const subject = `Orçamento AgendaAqui - ${quoteData.service}`;
    const content = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4F46E5;">AgendaAqui</h1>
          <h2 style="color: #333;">Seu Orçamento</h2>
        </div>
        
        <div style="background-color: #f8fafc; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
          <h3 style="color: #333; margin-top: 0;">Detalhes do Orçamento:</h3>
          <p><strong>Serviço:</strong> ${quoteData.service}</p>
          <p><strong>Área:</strong> ${quoteData.area}</p>
          <p><strong>Valor Total:</strong> <span style="color: #10B981; font-size: 24px; font-weight: bold;">R$ ${quoteData.total?.toFixed(2)}</span></p>
          ${quoteData.observations ? `<p><strong>Observações:</strong> ${quoteData.observations}</p>` : ''}
        </div>
        
        <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <p style="color: #065f46; margin: 0;">
            <strong>Oferta especial:</strong> Este orçamento é válido por 15 dias. 
            Agende agora e ganhe 10% de desconto!
          </p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background-color: #10B981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-size: 16px;">
            Agendar Agora
          </a>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; color: #666; font-size: 14px;">
          <p>Dúvidas sobre o orçamento? Entre em contato:</p>
          <p>📧 admin@agendaaqui.online | 📱 (31) 99999-9999</p>
        </div>
      </div>
    `;
    
    return await this.sendEmail(userEmail, subject, content);
  }

  // Email de avaliação pós-serviço
  async sendServiceEvaluation(userEmail, bookingData) {
    const subject = 'Como foi nosso serviço? Deixe sua avaliação';
    const content = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4F46E5;">AgendaAqui</h1>
          <h2 style="color: #333;">Como foi nosso serviço?</h2>
        </div>
        
        <div style="background-color: #f8fafc; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            Olá! Esperamos que você tenha ficado satisfeito(a) com nosso serviço de <strong>${bookingData.service}</strong> 
            realizado em ${new Date(bookingData.date).toLocaleDateString('pt-BR')}.
          </p>
          
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            Sua opinião é muito importante para nós! Deixe sua avaliação e nos ajude a melhorar nossos serviços.
          </p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #666; margin-bottom: 15px;">Avalie nosso serviço:</p>
          <div style="font-size: 30px; margin-bottom: 20px;">⭐⭐⭐⭐⭐</div>
          <a href="#" style="background-color: #F59E0B; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Deixar Avaliação
          </a>
        </div>
        
        <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px;">
          <p style="color: #065f46; margin: 0; text-align: center;">
            <strong>Ganhe 50 pontos de fidelidade</strong> ao deixar sua avaliação!
          </p>
        </div>
      </div>
    `;
    
    return await this.sendEmail(userEmail, subject, content);
  }

  // Email para cliente informando o funcionário atribuído
  async sendStaffAssignmentToClient(clientEmail, clientName, staffName, serviceData) {
    const subject = `Prestador de Serviço Atribuído - ${serviceData.service}`;
    const content = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4F46E5;">AgendaAqui</h1>
          <h2 style="color: #10B981;">Prestador de Serviço Designado!</h2>
        </div>
        
        <div style="background-color: #f0fdf4; border: 2px solid #10B981; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
          <p style="color: #065f46; font-size: 18px; margin-top: 0;">
            Olá <strong>${clientName}</strong>!
          </p>
          <p style="color: #065f46; font-size: 16px; line-height: 1.6;">
            Temos o prazer de informar que o nosso prestador de serviço <strong>${staffName}</strong> 
            irá atender sua demanda no dia <strong>${new Date(serviceData.date).toLocaleDateString('pt-BR')}</strong> 
            às <strong>${serviceData.time}</strong>.
          </p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h3 style="color: #333; margin-top: 0;">Detalhes do Serviço:</h3>
          <p><strong>Serviço:</strong> ${serviceData.service}</p>
          <p><strong>Data:</strong> ${new Date(serviceData.date).toLocaleDateString('pt-BR')}</p>
          <p><strong>Horário:</strong> ${serviceData.time}</p>
          <p><strong>Endereço:</strong> ${serviceData.address}</p>
          <p><strong>Prestador:</strong> ${staffName}</p>
          ${serviceData.value ? `<p><strong>Valor:</strong> R$ ${serviceData.value.toFixed(2)}</p>` : ''}
        </div>
        
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h4 style="color: #92400e; margin-top: 0;">Informações Importantes:</h4>
          <ul style="color: #92400e; margin: 0;">
            <li>O prestador selecionado é o mais próximo da sua localização</li>
            <li>Todos os nossos prestadores são qualificados e avaliados</li>
            <li>Em caso de dúvidas, entre em contato conosco</li>
            <li>O prestador entrará em contato 1 hora antes do horário agendado</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background-color: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Acompanhar Serviço
          </a>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; color: #666; font-size: 14px;">
          <p>Dúvidas? Entre em contato:</p>
          <p>📧 admin@agendaaqui.online | 📱 (31) 99999-9999</p>
        </div>
      </div>
    `;
    
    return await this.sendEmail(clientEmail, subject, content);
  }

  // Email para funcionário informando novo serviço
  async sendServiceAssignmentToStaff(staffEmail, staffName, serviceData) {
    const subject = `Novo Serviço Atribuído - ${serviceData.service}`;
    const content = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4F46E5;">AgendaAqui</h1>
          <h2 style="color: #F59E0B;">Novo Serviço Atribuído!</h2>
        </div>
        
        <div style="background-color: #fef3c7; border: 2px solid #F59E0B; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
          <p style="color: #92400e; font-size: 18px; margin-top: 0;">
            Olá <strong>${staffName}</strong>!
          </p>
          <p style="color: #92400e; font-size: 16px; line-height: 1.6;">
            Você foi selecionado para realizar um novo serviço. Confira os detalhes abaixo:
          </p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h3 style="color: #333; margin-top: 0;">Detalhes do Serviço:</h3>
          <p><strong>Tipo de Serviço:</strong> ${serviceData.service}</p>
          <p><strong>Data:</strong> ${new Date(serviceData.date).toLocaleDateString('pt-BR')}</p>
          <p><strong>Horário:</strong> ${serviceData.time}</p>
          <p><strong>Endereço:</strong> ${serviceData.address}</p>
          <p><strong>Cliente:</strong> ${serviceData.clientName || 'A confirmar'}</p>
          ${serviceData.clientPhone ? `<p><strong>Telefone do Cliente:</strong> ${serviceData.clientPhone}</p>` : ''}
          ${serviceData.observations ? `<p><strong>Observações:</strong> ${serviceData.observations}</p>` : ''}
        </div>
        
        <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h4 style="color: #065f46; margin-top: 0;">Instruções:</h4>
          <ul style="color: #065f46; margin: 0;">
            <li>Entre em contato com o cliente 1 hora antes do horário</li>
            <li>Leve todos os equipamentos e produtos necessários</li>
            <li>Seja pontual e profissional</li>
            <li>Confirme o recebimento deste email</li>
            <li>Em caso de problemas, entre em contato imediatamente</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background-color: #10B981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin-right: 10px;">
            Confirmar Recebimento
          </a>
          <a href="#" style="background-color: #EF4444; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reportar Problema
          </a>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; color: #666; font-size: 14px;">
          <p>Dúvidas? Entre em contato:</p>
          <p>📧 admin@agendaaqui.online | 📱 (31) 99999-9999</p>
        </div>
      </div>
    `;
    
    return await this.sendEmail(staffEmail, subject, content);
  }
}

export default new EmailService();
