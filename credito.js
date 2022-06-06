class Credito {

    constructor(nombre= null, rut = null, monto = null, cuotas = null, cuotaMensual = null, totalaPagar = null, horaYFecha = null, timestamp = null) {
        this.nombre = nombre;
        this.rut = rut;
        this.monto = monto;
        this.cuotas = cuotas;
        this.cuotaMensual = cuotaMensual;
        this.totalaPagar = totalaPagar;
        this.horaYFecha = horaYFecha;
        this.timestamp = timestamp;
    }

    calcularCuota(){
      let interes = 0;
      let montoInteres = 0;
      let montoFinal = 0;
      let texto = "";
      let array = [];
      switch(parseInt(this.cuotas)){
        case 6:
          interes = 1.01;
          montoInteres = this.monto * interes;
          montoFinal = parseInt(montoInteres/this.cuotas);
          this.cuotaMensual = parseInt(montoInteres/this.cuotas);
          this.totalaPagar = montoInteres;
          array = [true, `Estimado/a ${this.nombre}, su cuota mensual será de ${parseInt(montoInteres/this.cuotas)} | Total a pagar: ${montoInteres}`];
          break;
        case 12:
          interes = 1.02;
          montoInteres = this.monto * interes;
          montoFinal = parseInt(montoInteres/this.cuotas);
          this.cuotaMensual = parseInt(montoInteres/this.cuotas);
          this.totalaPagar = montoInteres;
          array = [true, `Estimado/a ${this.nombre}, su cuota mensual será de ${parseInt(montoInteres/this.cuotas)} | Total a pagar: ${montoInteres}`];
          break;
        case 24:
          interes = 1.03;
          montoInteres = this.monto * interes;
          montoFinal = parseInt(montoInteres/this.cuotas);
          this.cuotaMensual = parseInt(montoInteres/this.cuotas);
          this.totalaPagar = montoInteres;
          array = [true, `Estimado/a ${this.nombre}, su cuota mensual será de ${parseInt(montoInteres/this.cuotas)} | Total a pagar: ${montoInteres}`];
          break;
        case 36:
          interes = 1.04;
          montoInteres = this.monto * interes;
          montoFinal = parseInt(montoInteres/this.cuotas);
          this.cuotaMensual = parseInt(montoInteres/this.cuotas);
          this.totalaPagar = montoInteres;
          array = [true, `Estimado/a ${this.nombre}, su cuota mensual será de ${parseInt(montoInteres/this.cuotas)} | Total a pagar: ${montoInteres}`];
          break;
        case 48:
          interes = 1.05;
          montoInteres = this.monto * interes;
          montoFinal = parseInt(montoInteres/this.cuotas);
          this.cuotaMensual = parseInt(montoInteres/this.cuotas);
          this.totalaPagar = montoInteres;
          array = [true, `Estimado/a ${this.nombre}, su cuota mensual será de ${parseInt(montoInteres/this.cuotas)} | Total a pagar: ${montoInteres}`];
          break;
        case 60:
          interes = 1.06;
          montoInteres = this.monto * interes;
          montoFinal = parseInt(montoInteres/this.cuotas);
          this.cuotaMensual = parseInt(montoInteres/this.cuotas);
          this.totalaPagar = montoInteres;
          array = [true, `Estimado/a ${this.nombre}, su cuota mensual será de ${parseInt(montoInteres/this.cuotas)} | Total a pagar: ${montoInteres}`];
          break;
        case 72:
          interes = 1.07;
          montoInteres = this.monto * interes;
          montoFinal = parseInt(montoInteres/this.cuotas);
          this.cuotaMensual = parseInt(montoInteres/this.cuotas);
          this.totalaPagar = montoInteres;
          array = [true, `Estimado/a ${this.nombre}, su cuota mensual será de ${parseInt(montoInteres/this.cuotas)} | Total a pagar: ${montoInteres}`];
          break;
        default:
          array = [false, 'No ha sido posible calcular su cuota mensual'];
          break;
      }
      return array;
    }
}