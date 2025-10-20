
var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.ngtlib.math);
importPackage(Packages.jp.ngt.rtm);
importPackage(Packages.jp.ngt.rtm.entity.train.util);

//##### オブジェクト定義 ####################
function init(par1, par2)
{
	//車体
	body = renderer.registerParts(new Parts("Body","Body_Parts","Body_Mirror","Interior","Interior_Parts","Interior_Mirror","Interior_Crew","Roof","Roof_Mirror","Roof_Piping","Panta_Front","Panta_Back","Bottom","Bottom_Mirror","FRP1","FRP2","FRP3","Front_Parts","Light","Sticker"));
	lightF = renderer.registerParts(new Parts("Light_F"));
	lightB = renderer.registerParts(new Parts("Light_B"));
	door_LF = renderer.registerParts(new Parts("door_LF"));
	door_RF = renderer.registerParts(new Parts("door_RF"));
	door_LB = renderer.registerParts(new Parts("door_LB"));
	door_RB = renderer.registerParts(new Parts("door_RB"));
	alpha = renderer.registerParts(new Parts("Alpha"));
	door_LFa = renderer.registerParts(new Parts("door_LFa"));
	door_RFa = renderer.registerParts(new Parts("door_RFa"));
	door_LBa = renderer.registerParts(new Parts("door_LBa"));
	door_RBa = renderer.registerParts(new Parts("door_RBa"));

	//パンタ前方
	Panta_Front_1 = renderer.registerParts(new Parts("Panta_Front_1"));
	Panta_Front_2 = renderer.registerParts(new Parts("Panta_Front_2"));
	Panta_Front_3 = renderer.registerParts(new Parts("Panta_Front_3"));
	Panta_Front_4 = renderer.registerParts(new Parts("Panta_Front_4"));
	Panta_Front_5 = renderer.registerParts(new Parts("Panta_Front_5"));
	
	//パンタ後方
	Panta_Back_1 = renderer.registerParts(new Parts("Panta_Back_1"));
	Panta_Back_2 = renderer.registerParts(new Parts("Panta_Back_2"));
	Panta_Back_3 = renderer.registerParts(new Parts("Panta_Back_3"));
	Panta_Back_4 = renderer.registerParts(new Parts("Panta_Back_4"));
	Panta_Back_5 = renderer.registerParts(new Parts("Panta_Back_5"));
	
}


function MCVersionChecker() {
    var varsion = RTMCore.VERSION;
    if (varsion.indexOf("1.7.10") >= 0) return "1.7.10";
    else if (varsion.indexOf("2.0") >= 0) return "1.8.9";
    else if (varsion.indexOf("2.1") >= 0) return "1.9.4";
    else if (varsion.indexOf("2.2") >= 0) return "1.10.2";
    else if (varsion.indexOf("2.4") >= 0) return "1.12.2";
    else return "unknown";
}



//##### render ####################
function render(entity, pass, par3)
{
	//数値設定
	var doorMove = 0.64 //ドア開閉距離(m)
	
	GL11.glPushMatrix();
	
	//通常描画
	if(pass == 0){
		body.render(renderer);
		render_door(entity, doorMove);
		render_light(entity);
		render_panta(entity);
	}
	
	//半透明描画
	if(pass == 1){
		alpha.render(renderer);
		render_door_a(entity, doorMove);
	}
	
	//発光部描画
	if(pass > 1){
		body.render(renderer);
		render_light(entity);
		render_door(entity, doorMove);
	}
	
	GL11.glPopMatrix();
}


//##### render_ライト ####################
function render_light(entity){
	
	var varsion = MCVersionChecker();
	var lightMove = 0;
	var ExState = 0;
	

	if(entity != null){

	if(varsion == "1.7.10" || varsion == "1.8.9" || varsion == "1.9.4"){
	    ExState = entity.getTrainStateData(11);
	}else{
	    ExState = entity.getVehicleState(TrainState.getStateType(11));
	}

	}

	try{
		lightMove = (entity.seatRotation)/ 45;
	}catch(e){}
	

	 if(lightMove < 0){
	  GL11.glPushMatrix();
	  lightF.render(renderer);
	  GL11.glPopMatrix();
	 }else{
	  GL11.glPushMatrix();
	  lightB.render(renderer);
	  GL11.glPopMatrix();
	 }
}


//##### render_ドア ####################
function render_door(entity,doorMove){
	
	var doorMoveL = 0.0,
		doorMoveR = 0.0;
	
	try{
		doorMoveL = renderer.sigmoid(entity.doorMoveL / 60) * doorMove;
		doorMoveR = renderer.sigmoid(entity.doorMoveR / 60) * doorMove;
	}catch(e){}
	
	GL11.glPushMatrix();
	GL11.glTranslatef(0.0, 0.0, doorMoveL);
	door_LF.render(renderer);
	GL11.glPopMatrix();
	
	GL11.glPushMatrix();
	GL11.glTranslatef(0.0, 0.0, -doorMoveL);
	door_LB.render(renderer);
	GL11.glPopMatrix();
	
	GL11.glPushMatrix();
	GL11.glTranslatef(0.0, 0.0, doorMoveR);
	door_RF.render(renderer);
	GL11.glPopMatrix();
	
	GL11.glPushMatrix();
	GL11.glTranslatef(0.0, 0.0, -doorMoveR);
	door_RB.render(renderer);
	GL11.glPopMatrix();
}

//##### render_半透ドア ####################
function render_door_a(entity,doorMove){
	
	var doorMoveL = 0.0,
		doorMoveR = 0.0;
	
	try{
		doorMoveL = renderer.sigmoid(entity.doorMoveL / 60) * doorMove;
		doorMoveR = renderer.sigmoid(entity.doorMoveR / 60) * doorMove;
	}catch(e){}
	
	GL11.glPushMatrix();
	GL11.glTranslatef(0.0, 0.0, doorMoveL);
	door_LFa.render(renderer);
	GL11.glPopMatrix();
	
	GL11.glPushMatrix();
	GL11.glTranslatef(0.0, 0.0, -doorMoveL);
	door_LBa.render(renderer);
	GL11.glPopMatrix();
	
	GL11.glPushMatrix();
	GL11.glTranslatef(0.0, 0.0, doorMoveR);
	door_RFa.render(renderer);
	GL11.glPopMatrix();
	
	GL11.glPushMatrix();
	GL11.glTranslatef(0.0, 0.0, -doorMoveR);
	door_RBa.render(renderer);
	GL11.glPopMatrix();
}


//##### render_パンタ ####################
function render_panta(entity, pass, par3)
{
	
	var pantoRotate = 0;

	try{
		pantoRotate = (1-(entity.pantograph_F / 40));
	}catch(e){}
	
	//##### パンタグラフ前方(初期状態折り畳み) ####################
	GL11.glPushMatrix();
	GL11.glTranslatef(0.0, 2.84, 7.23);
	GL11.glRotatef(-23 * pantoRotate, 1.0, 0.0, 0.0);
	GL11.glTranslatef(-0.0, -2.84, -7.23);
	Panta_Front_1.render(renderer);
	{
		GL11.glPushMatrix();
		GL11.glTranslatef(0.0, 3.00, 8.42);
		GL11.glRotatef(48 * pantoRotate, 1.0, 0.0, 0.0);
		GL11.glTranslatef(-0.0, -3.00, -8.42);
		Panta_Front_2.render(renderer);

		{
			GL11.glPushMatrix();
			GL11.glTranslatef(0.0, 2.93, 6.97);
			GL11.glRotatef(-25 * pantoRotate, 1.0, 0.0, 0.0);
			GL11.glTranslatef(-0.0, -2.93, -6.97);
			Panta_Front_3.render(renderer);
			GL11.glPopMatrix();
			
			GL11.glPushMatrix();
			GL11.glTranslatef(0.0, 2.87, 6.98);
			GL11.glRotatef(1.5 * pantoRotate, 1.0, 0.0, 0.0);
			GL11.glTranslatef(-0.0, -2.87, -6.98);
			Panta_Front_4.render(renderer);
			GL11.glPopMatrix();

			GL11.glPushMatrix();
			GL11.glTranslatef(0.0, 2.88, 8.60);
			GL11.glRotatef(-61 * pantoRotate, 1.0, 0.0, 0.0);
			GL11.glTranslatef(-0.0, -2.88, -8.60);
			Panta_Front_5.render(renderer);
			GL11.glPopMatrix();

		}
		GL11.glPopMatrix();

	}
	GL11.glPopMatrix();

	//##### パンタグラフ後方(初期状態折り畳み) ####################
	GL11.glPushMatrix();
	GL11.glTranslatef(0.0, 2.84, -7.15);
	GL11.glRotatef(23 * pantoRotate, 1.0, 0.0, 0.0);
	GL11.glTranslatef(-0.0, -2.84, 7.15);
	Panta_Back_1.render(renderer);
	{
		GL11.glPushMatrix();
		GL11.glTranslatef(0.0, 3.00, -8.36);
		GL11.glRotatef(-48 * pantoRotate, 1.0, 0.0, 0.0);
		GL11.glTranslatef(-0.0, -3.00, 8.36);
		Panta_Back_2.render(renderer);

		{
			GL11.glPushMatrix();
			GL11.glTranslatef(0.0, 2.93, -6.89);
			GL11.glRotatef(25 * pantoRotate, 1.0, 0.0, 0.0);
			GL11.glTranslatef(-0.0, -2.93, 6.89);
			Panta_Back_3.render(renderer);
			GL11.glPopMatrix();
			
			GL11.glPushMatrix();
			GL11.glTranslatef(0.0, 2.87, -6.91);
			GL11.glRotatef(-1.5 * pantoRotate, 1.0, 0.0, 0.0);
			GL11.glTranslatef(-0.0, -2.87, 6.91);
			Panta_Back_4.render(renderer);
			GL11.glPopMatrix();

			GL11.glPushMatrix();
			GL11.glTranslatef(0.0, 2.88, -8.52);
			GL11.glRotatef(61 * pantoRotate, 1.0, 0.0, 0.0);
			GL11.glTranslatef(-0.0, -2.88, 8.52);
			Panta_Back_5.render(renderer);
			GL11.glPopMatrix();

		}
		GL11.glPopMatrix();

	}
	GL11.glPopMatrix();

}