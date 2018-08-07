import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Line } from '../../models/line';
import { isArray } from 'ionic-angular/util/util';
import { Checkpoint } from '../../models/checkpoint';
import { Observable } from 'rxjs/Observable';
import { BlockedZone } from '../../models/blockedZone';
import { Profile } from '../../models/profile';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireObject } from 'angularfire2/database/interfaces';

@Injectable()
export class RestProvider {

  
  //apiUrl: string = 'http://localhost:3000/api/v1'; 
  apiUrl: string = 'https://grc-web-app.herokuapp.com/api/v1';

  //line 212
  route1: any[] = [  {"id":1,"latitude":-17.3957531176035,"longitude":-66.2788707017899,"line_id":1,"created_at":"2018-01-21T00:34:54.463Z","updated_at":"2018-01-21T00:34:54.463Z"},
                      {"id":2,"latitude":-17.3948777557503,"longitude":-66.2775939702988,"line_id":1,"created_at":"2018-01-21T00:34:54.474Z","updated_at":"2018-01-21T00:34:54.474Z"},
                      {"id":3,"latitude":-17.3939511985809,"longitude":-66.2773954868317,"line_id":1,"created_at":"2018-01-21T00:34:54.491Z","updated_at":"2018-01-21T00:34:54.491Z"},
                      {"id":4,"latitude":-17.3938027442335,"longitude":-66.2762045860291,"line_id":1,"created_at":"2018-01-21T00:34:54.506Z","updated_at":"2018-01-21T00:34:54.506Z"},
                      {"id":5,"latitude":-17.3936645280086,"longitude":-66.2750244140625,"line_id":1,"created_at":"2018-01-21T00:34:54.515Z","updated_at":"2018-01-21T00:34:54.515Z"},
                      {"id":6,"latitude":-17.3936389324,"longitude":-66.2745469808578,"line_id":1,"created_at":"2018-01-21T00:34:54.532Z","updated_at":"2018-01-21T00:34:54.532Z"},
                      {"id":7,"latitude":-17.3934853586728,"longitude":-66.2730932235718,"line_id":1,"created_at":"2018-01-21T00:34:54.542Z","updated_at":"2018-01-21T00:34:54.542Z"},
                      {"id":8,"latitude":-17.3934034526322,"longitude":-66.272588968277,"line_id":1,"created_at":"2018-01-21T00:34:54.558Z","updated_at":"2018-01-21T00:34:54.558Z"},
                      {"id":9,"latitude":-17.3933420230777,"longitude":-66.2721759080887,"line_id":1,"created_at":"2018-01-21T00:34:54.569Z","updated_at":"2018-01-21T00:34:54.569Z"},
                      {"id":70,"latitude":-17.3957531176035,"longitude":-66.2788707017899,"line_id":1,"created_at":"2018-05-18T01:19:44.712Z","updated_at":"2018-05-18T01:19:44.712Z"},
                      {"id":71,"latitude":-17.3948777557503,"longitude":-66.2775939702988,"line_id":1,"created_at":"2018-05-18T01:19:44.733Z","updated_at":"2018-05-18T01:19:44.733Z"},
                      {"id":72,"latitude":-17.3939511985809,"longitude":-66.2773954868317,"line_id":1,"created_at":"2018-05-18T01:19:44.750Z","updated_at":"2018-05-18T01:19:44.750Z"},
                      {"id":73,"latitude":-17.3938027442335,"longitude":-66.2762045860291,"line_id":1,"created_at":"2018-05-18T01:19:44.758Z","updated_at":"2018-05-18T01:19:44.758Z"},
                      {"id":74,"latitude":-17.3936645280086,"longitude":-66.2750244140625,"line_id":1,"created_at":"2018-05-18T01:19:44.765Z","updated_at":"2018-05-18T01:19:44.765Z"},
                      {"id":75,"latitude":-17.3936389324,"longitude":-66.2745469808578,"line_id":1,"created_at":"2018-05-18T01:19:44.773Z","updated_at":"2018-05-18T01:19:44.773Z"},
                      {"id":76,"latitude":-17.3934853586728,"longitude":-66.2730932235718,"line_id":1,"created_at":"2018-05-18T01:19:44.781Z","updated_at":"2018-05-18T01:19:44.781Z"},
                      {"id":77,"latitude":-17.3934034526322,"longitude":-66.272588968277,"line_id":1,"created_at":"2018-05-18T01:19:44.788Z","updated_at":"2018-05-18T01:19:44.788Z"},
                      {"id":78,"latitude":-17.3933420230777,"longitude":-66.2721759080887,"line_id":1,"created_at":"2018-05-18T01:19:44.795Z","updated_at":"2018-05-18T01:19:44.795Z"},
                      {"id":139,"latitude":-17.3957531176035,"longitude":-66.2788707017899,"line_id":1,"created_at":"2018-05-18T01:26:39.661Z","updated_at":"2018-05-18T01:26:39.661Z"},
                      {"id":140,"latitude":-17.3948777557503,"longitude":-66.2775939702988,"line_id":1,"created_at":"2018-05-18T01:26:39.672Z","updated_at":"2018-05-18T01:26:39.672Z"},
                      {"id":141,"latitude":-17.3939511985809,"longitude":-66.2773954868317,"line_id":1,"created_at":"2018-05-18T01:26:39.684Z","updated_at":"2018-05-18T01:26:39.684Z"},
                      {"id":142,"latitude":-17.3938027442335,"longitude":-66.2762045860291,"line_id":1,"created_at":"2018-05-18T01:26:39.699Z","updated_at":"2018-05-18T01:26:39.699Z"},
                      {"id":143,"latitude":-17.3936645280086,"longitude":-66.2750244140625,"line_id":1,"created_at":"2018-05-18T01:26:39.710Z","updated_at":"2018-05-18T01:26:39.710Z"},
                      {"id":144,"latitude":-17.3936389324,"longitude":-66.2745469808578,"line_id":1,"created_at":"2018-05-18T01:26:39.725Z","updated_at":"2018-05-18T01:26:39.725Z"},
                      {"id":145,"latitude":-17.3934853586728,"longitude":-66.2730932235718,"line_id":1,"created_at":"2018-05-18T01:26:39.734Z","updated_at":"2018-05-18T01:26:39.734Z"},
                      {"id":146,"latitude":-17.3934034526322,"longitude":-66.272588968277,"line_id":1,"created_at":"2018-05-18T01:26:39.744Z","updated_at":"2018-05-18T01:26:39.744Z"},
                      {"id":147,"latitude":-17.3933420230777,"longitude":-66.2721759080887,"line_id":1,"created_at":"2018-05-18T01:26:39.754Z","updated_at":"2018-05-18T01:26:39.754Z"},
                      {"id":208,"latitude":-17.3957531176035,"longitude":-66.2788707017899,"line_id":1,"created_at":"2018-06-04T01:18:33.938Z","updated_at":"2018-06-04T01:18:33.938Z"},
                      {"id":209,"latitude":-17.3948777557503,"longitude":-66.2775939702988,"line_id":1,"created_at":"2018-06-04T01:18:33.963Z","updated_at":"2018-06-04T01:18:33.963Z"},
                      {"id":210,"latitude":-17.3939511985809,"longitude":-66.2773954868317,"line_id":1,"created_at":"2018-06-04T01:18:33.980Z","updated_at":"2018-06-04T01:18:33.980Z"},
                      {"id":211,"latitude":-17.3938027442335,"longitude":-66.2762045860291,"line_id":1,"created_at":"2018-06-04T01:18:34.004Z","updated_at":"2018-06-04T01:18:34.004Z"},
                      {"id":212,"latitude":-17.3936645280086,"longitude":-66.2750244140625,"line_id":1,"created_at":"2018-06-04T01:18:34.028Z","updated_at":"2018-06-04T01:18:34.028Z"},
                      {"id":213,"latitude":-17.3936389324,"longitude":-66.2745469808578,"line_id":1,"created_at":"2018-06-04T01:18:34.044Z","updated_at":"2018-06-04T01:18:34.044Z"},
                      {"id":214,"latitude":-17.3934853586728,"longitude":-66.2730932235718,"line_id":1,"created_at":"2018-06-04T01:18:34.060Z","updated_at":"2018-06-04T01:18:34.060Z"},
                      {"id":215,"latitude":-17.3934034526322,"longitude":-66.272588968277,"line_id":1,"created_at":"2018-06-04T01:18:34.084Z","updated_at":"2018-06-04T01:18:34.084Z"},
                      {"id":216,"latitude":-17.3933420230777,"longitude":-66.2721759080887,"line_id":1,"created_at":"2018-06-04T01:18:34.103Z","updated_at":"2018-06-04T01:18:34.103Z"}];

  //line 212 No se
  route2: any[] = [  {"id":1,"latitude":-17.3957531176035,"longitude":-66.2788707017899,"line_id":1,"created_at":"2018-01-21T00:34:54.463Z","updated_at":"2018-01-21T00:34:54.463Z"},
                      {"id":2,"latitude":-17.3948777557503,"longitude":-66.2775939702988,"line_id":1,"created_at":"2018-01-21T00:34:54.474Z","updated_at":"2018-01-21T00:34:54.474Z"},
                      {"id":3,"latitude":-17.3939511985809,"longitude":-66.2773954868317,"line_id":1,"created_at":"2018-01-21T00:34:54.491Z","updated_at":"2018-01-21T00:34:54.491Z"},
                      {"id":4,"latitude":-17.3938027442335,"longitude":-66.2762045860291,"line_id":1,"created_at":"2018-01-21T00:34:54.506Z","updated_at":"2018-01-21T00:34:54.506Z"},
                      {"id":5,"latitude":-17.3936645280086,"longitude":-66.2750244140625,"line_id":1,"created_at":"2018-01-21T00:34:54.515Z","updated_at":"2018-01-21T00:34:54.515Z"},
                      {"id":6,"latitude":-17.3936389324,"longitude":-66.2745469808578,"line_id":1,"created_at":"2018-01-21T00:34:54.532Z","updated_at":"2018-01-21T00:34:54.532Z"},
                      {"id":7,"latitude":-17.3934853586728,"longitude":-66.2730932235718,"line_id":1,"created_at":"2018-01-21T00:34:54.542Z","updated_at":"2018-01-21T00:34:54.542Z"},
                      {"id":8,"latitude":-17.3934034526322,"longitude":-66.272588968277,"line_id":1,"created_at":"2018-01-21T00:34:54.558Z","updated_at":"2018-01-21T00:34:54.558Z"},
                      {"id":9,"latitude":-17.3933420230777,"longitude":-66.2721759080887,"line_id":1,"created_at":"2018-01-21T00:34:54.569Z","updated_at":"2018-01-21T00:34:54.569Z"},
                      {"id":70,"latitude":-17.3957531176035,"longitude":-66.2788707017899,"line_id":1,"created_at":"2018-05-18T01:19:44.712Z","updated_at":"2018-05-18T01:19:44.712Z"},
                      {"id":71,"latitude":-17.3948777557503,"longitude":-66.2775939702988,"line_id":1,"created_at":"2018-05-18T01:19:44.733Z","updated_at":"2018-05-18T01:19:44.733Z"},
                      {"id":72,"latitude":-17.3939511985809,"longitude":-66.2773954868317,"line_id":1,"created_at":"2018-05-18T01:19:44.750Z","updated_at":"2018-05-18T01:19:44.750Z"},
                      {"id":73,"latitude":-17.3938027442335,"longitude":-66.2762045860291,"line_id":1,"created_at":"2018-05-18T01:19:44.758Z","updated_at":"2018-05-18T01:19:44.758Z"},
                      {"id":74,"latitude":-17.3936645280086,"longitude":-66.2750244140625,"line_id":1,"created_at":"2018-05-18T01:19:44.765Z","updated_at":"2018-05-18T01:19:44.765Z"},
                      {"id":75,"latitude":-17.3936389324,"longitude":-66.2745469808578,"line_id":1,"created_at":"2018-05-18T01:19:44.773Z","updated_at":"2018-05-18T01:19:44.773Z"},
                      {"id":76,"latitude":-17.3934853586728,"longitude":-66.2730932235718,"line_id":1,"created_at":"2018-05-18T01:19:44.781Z","updated_at":"2018-05-18T01:19:44.781Z"},
                      {"id":77,"latitude":-17.3934034526322,"longitude":-66.272588968277,"line_id":1,"created_at":"2018-05-18T01:19:44.788Z","updated_at":"2018-05-18T01:19:44.788Z"},
                      {"id":78,"latitude":-17.3933420230777,"longitude":-66.2721759080887,"line_id":1,"created_at":"2018-05-18T01:19:44.795Z","updated_at":"2018-05-18T01:19:44.795Z"},
                      {"id":139,"latitude":-17.3957531176035,"longitude":-66.2788707017899,"line_id":1,"created_at":"2018-05-18T01:26:39.661Z","updated_at":"2018-05-18T01:26:39.661Z"},
                      {"id":140,"latitude":-17.3948777557503,"longitude":-66.2775939702988,"line_id":1,"created_at":"2018-05-18T01:26:39.672Z","updated_at":"2018-05-18T01:26:39.672Z"},
                      {"id":141,"latitude":-17.3939511985809,"longitude":-66.2773954868317,"line_id":1,"created_at":"2018-05-18T01:26:39.684Z","updated_at":"2018-05-18T01:26:39.684Z"},
                      {"id":142,"latitude":-17.3938027442335,"longitude":-66.2762045860291,"line_id":1,"created_at":"2018-05-18T01:26:39.699Z","updated_at":"2018-05-18T01:26:39.699Z"},
                      {"id":143,"latitude":-17.3936645280086,"longitude":-66.2750244140625,"line_id":1,"created_at":"2018-05-18T01:26:39.710Z","updated_at":"2018-05-18T01:26:39.710Z"},
                      {"id":144,"latitude":-17.3936389324,"longitude":-66.2745469808578,"line_id":1,"created_at":"2018-05-18T01:26:39.725Z","updated_at":"2018-05-18T01:26:39.725Z"},
                      {"id":145,"latitude":-17.3934853586728,"longitude":-66.2730932235718,"line_id":1,"created_at":"2018-05-18T01:26:39.734Z","updated_at":"2018-05-18T01:26:39.734Z"},
                      {"id":146,"latitude":-17.3934034526322,"longitude":-66.272588968277,"line_id":1,"created_at":"2018-05-18T01:26:39.744Z","updated_at":"2018-05-18T01:26:39.744Z"},
                      {"id":147,"latitude":-17.3933420230777,"longitude":-66.2721759080887,"line_id":1,"created_at":"2018-05-18T01:26:39.754Z","updated_at":"2018-05-18T01:26:39.754Z"},
                      {"id":208,"latitude":-17.3957531176035,"longitude":-66.2788707017899,"line_id":1,"created_at":"2018-06-04T01:18:33.938Z","updated_at":"2018-06-04T01:18:33.938Z"},
                      {"id":209,"latitude":-17.3948777557503,"longitude":-66.2775939702988,"line_id":1,"created_at":"2018-06-04T01:18:33.963Z","updated_at":"2018-06-04T01:18:33.963Z"},
                      {"id":210,"latitude":-17.3939511985809,"longitude":-66.2773954868317,"line_id":1,"created_at":"2018-06-04T01:18:33.980Z","updated_at":"2018-06-04T01:18:33.980Z"},
                      {"id":211,"latitude":-17.3938027442335,"longitude":-66.2762045860291,"line_id":1,"created_at":"2018-06-04T01:18:34.004Z","updated_at":"2018-06-04T01:18:34.004Z"},
                      {"id":212,"latitude":-17.3936645280086,"longitude":-66.2750244140625,"line_id":1,"created_at":"2018-06-04T01:18:34.028Z","updated_at":"2018-06-04T01:18:34.028Z"},
                      {"id":213,"latitude":-17.3936389324,"longitude":-66.2745469808578,"line_id":1,"created_at":"2018-06-04T01:18:34.044Z","updated_at":"2018-06-04T01:18:34.044Z"},
                      {"id":214,"latitude":-17.3934853586728,"longitude":-66.2730932235718,"line_id":1,"created_at":"2018-06-04T01:18:34.060Z","updated_at":"2018-06-04T01:18:34.060Z"},
                      {"id":215,"latitude":-17.3934034526322,"longitude":-66.272588968277,"line_id":1,"created_at":"2018-06-04T01:18:34.084Z","updated_at":"2018-06-04T01:18:34.084Z"},
                      {"id":216,"latitude":-17.3933420230777,"longitude":-66.2721759080887,"line_id":1,"created_at":"2018-06-04T01:18:34.103Z","updated_at":"2018-06-04T01:18:34.103Z"}];

  //line 212
  route3: any[] = [  {"id":1,"latitude":-17.3957531176035,"longitude":-66.2788707017899,"line_id":1,"created_at":"2018-01-21T00:34:54.463Z","updated_at":"2018-01-21T00:34:54.463Z"},
                      {"id":2,"latitude":-17.3948777557503,"longitude":-66.2775939702988,"line_id":1,"created_at":"2018-01-21T00:34:54.474Z","updated_at":"2018-01-21T00:34:54.474Z"},
                      {"id":3,"latitude":-17.3939511985809,"longitude":-66.2773954868317,"line_id":1,"created_at":"2018-01-21T00:34:54.491Z","updated_at":"2018-01-21T00:34:54.491Z"},
                      {"id":4,"latitude":-17.3938027442335,"longitude":-66.2762045860291,"line_id":1,"created_at":"2018-01-21T00:34:54.506Z","updated_at":"2018-01-21T00:34:54.506Z"},
                      {"id":5,"latitude":-17.3936645280086,"longitude":-66.2750244140625,"line_id":1,"created_at":"2018-01-21T00:34:54.515Z","updated_at":"2018-01-21T00:34:54.515Z"},
                      {"id":6,"latitude":-17.3936389324,"longitude":-66.2745469808578,"line_id":1,"created_at":"2018-01-21T00:34:54.532Z","updated_at":"2018-01-21T00:34:54.532Z"},
                      {"id":7,"latitude":-17.3934853586728,"longitude":-66.2730932235718,"line_id":1,"created_at":"2018-01-21T00:34:54.542Z","updated_at":"2018-01-21T00:34:54.542Z"},
                      {"id":8,"latitude":-17.3934034526322,"longitude":-66.272588968277,"line_id":1,"created_at":"2018-01-21T00:34:54.558Z","updated_at":"2018-01-21T00:34:54.558Z"},
                      {"id":9,"latitude":-17.3933420230777,"longitude":-66.2721759080887,"line_id":1,"created_at":"2018-01-21T00:34:54.569Z","updated_at":"2018-01-21T00:34:54.569Z"},
                      {"id":70,"latitude":-17.3957531176035,"longitude":-66.2788707017899,"line_id":1,"created_at":"2018-05-18T01:19:44.712Z","updated_at":"2018-05-18T01:19:44.712Z"},
                      {"id":71,"latitude":-17.3948777557503,"longitude":-66.2775939702988,"line_id":1,"created_at":"2018-05-18T01:19:44.733Z","updated_at":"2018-05-18T01:19:44.733Z"},
                      {"id":72,"latitude":-17.3939511985809,"longitude":-66.2773954868317,"line_id":1,"created_at":"2018-05-18T01:19:44.750Z","updated_at":"2018-05-18T01:19:44.750Z"},
                      {"id":73,"latitude":-17.3938027442335,"longitude":-66.2762045860291,"line_id":1,"created_at":"2018-05-18T01:19:44.758Z","updated_at":"2018-05-18T01:19:44.758Z"},
                      {"id":74,"latitude":-17.3936645280086,"longitude":-66.2750244140625,"line_id":1,"created_at":"2018-05-18T01:19:44.765Z","updated_at":"2018-05-18T01:19:44.765Z"},
                      {"id":75,"latitude":-17.3936389324,"longitude":-66.2745469808578,"line_id":1,"created_at":"2018-05-18T01:19:44.773Z","updated_at":"2018-05-18T01:19:44.773Z"},
                      {"id":76,"latitude":-17.3934853586728,"longitude":-66.2730932235718,"line_id":1,"created_at":"2018-05-18T01:19:44.781Z","updated_at":"2018-05-18T01:19:44.781Z"},
                      {"id":77,"latitude":-17.3934034526322,"longitude":-66.272588968277,"line_id":1,"created_at":"2018-05-18T01:19:44.788Z","updated_at":"2018-05-18T01:19:44.788Z"},
                      {"id":78,"latitude":-17.3933420230777,"longitude":-66.2721759080887,"line_id":1,"created_at":"2018-05-18T01:19:44.795Z","updated_at":"2018-05-18T01:19:44.795Z"},
                      {"id":139,"latitude":-17.3957531176035,"longitude":-66.2788707017899,"line_id":1,"created_at":"2018-05-18T01:26:39.661Z","updated_at":"2018-05-18T01:26:39.661Z"},
                      {"id":140,"latitude":-17.3948777557503,"longitude":-66.2775939702988,"line_id":1,"created_at":"2018-05-18T01:26:39.672Z","updated_at":"2018-05-18T01:26:39.672Z"},
                      {"id":141,"latitude":-17.3939511985809,"longitude":-66.2773954868317,"line_id":1,"created_at":"2018-05-18T01:26:39.684Z","updated_at":"2018-05-18T01:26:39.684Z"},
                      {"id":142,"latitude":-17.3938027442335,"longitude":-66.2762045860291,"line_id":1,"created_at":"2018-05-18T01:26:39.699Z","updated_at":"2018-05-18T01:26:39.699Z"},
                      {"id":143,"latitude":-17.3936645280086,"longitude":-66.2750244140625,"line_id":1,"created_at":"2018-05-18T01:26:39.710Z","updated_at":"2018-05-18T01:26:39.710Z"},
                      {"id":144,"latitude":-17.3936389324,"longitude":-66.2745469808578,"line_id":1,"created_at":"2018-05-18T01:26:39.725Z","updated_at":"2018-05-18T01:26:39.725Z"},
                      {"id":145,"latitude":-17.3934853586728,"longitude":-66.2730932235718,"line_id":1,"created_at":"2018-05-18T01:26:39.734Z","updated_at":"2018-05-18T01:26:39.734Z"},
                      {"id":146,"latitude":-17.3934034526322,"longitude":-66.272588968277,"line_id":1,"created_at":"2018-05-18T01:26:39.744Z","updated_at":"2018-05-18T01:26:39.744Z"},
                      {"id":147,"latitude":-17.3933420230777,"longitude":-66.2721759080887,"line_id":1,"created_at":"2018-05-18T01:26:39.754Z","updated_at":"2018-05-18T01:26:39.754Z"},
                      {"id":208,"latitude":-17.3957531176035,"longitude":-66.2788707017899,"line_id":1,"created_at":"2018-06-04T01:18:33.938Z","updated_at":"2018-06-04T01:18:33.938Z"},
                      {"id":209,"latitude":-17.3948777557503,"longitude":-66.2775939702988,"line_id":1,"created_at":"2018-06-04T01:18:33.963Z","updated_at":"2018-06-04T01:18:33.963Z"},
                      {"id":210,"latitude":-17.3939511985809,"longitude":-66.2773954868317,"line_id":1,"created_at":"2018-06-04T01:18:33.980Z","updated_at":"2018-06-04T01:18:33.980Z"},
                      {"id":211,"latitude":-17.3938027442335,"longitude":-66.2762045860291,"line_id":1,"created_at":"2018-06-04T01:18:34.004Z","updated_at":"2018-06-04T01:18:34.004Z"},
                      {"id":212,"latitude":-17.3936645280086,"longitude":-66.2750244140625,"line_id":1,"created_at":"2018-06-04T01:18:34.028Z","updated_at":"2018-06-04T01:18:34.028Z"},
                      {"id":213,"latitude":-17.3936389324,"longitude":-66.2745469808578,"line_id":1,"created_at":"2018-06-04T01:18:34.044Z","updated_at":"2018-06-04T01:18:34.044Z"},
                      {"id":214,"latitude":-17.3934853586728,"longitude":-66.2730932235718,"line_id":1,"created_at":"2018-06-04T01:18:34.060Z","updated_at":"2018-06-04T01:18:34.060Z"},
                      {"id":215,"latitude":-17.3934034526322,"longitude":-66.272588968277,"line_id":1,"created_at":"2018-06-04T01:18:34.084Z","updated_at":"2018-06-04T01:18:34.084Z"},
                      {"id":216,"latitude":-17.3933420230777,"longitude":-66.2721759080887,"line_id":1,"created_at":"2018-06-04T01:18:34.103Z","updated_at":"2018-06-04T01:18:34.103Z"}];

linesFound1: any[] = [ {"id":1,"name":"linea 212","frequency":15,"color":"#941751","created_at":"2018-01-21T00:34:54.374Z","updated_at":"2018-01-21T00:34:54.374Z","typeOfCar":"Trufi","syndicate_id":null,"route":this.route1},
                      {"id":2,"name":"linea 121","frequency":15,"color":"#0433ff","created_at":"2018-01-21T00:34:54.392Z","updated_at":"2018-01-21T00:34:54.392Z","typeOfCar":"Taxi-trufi","syndicate_id":null,"route":this.route2},
                      {"id":3,"name":"linea 203","frequency":15,"color":"#008C2F","created_at":"2018-01-21T00:34:54.399Z","updated_at":"2018-01-21T00:34:54.399Z","typeOfCar":"Bus","syndicate_id":null,"route":this.route3}]

linesFound2: any[] = [ {"id":1,"name":"linea 212","frequency":15,"color":"#941751","created_at":"2018-01-21T00:34:54.374Z","updated_at":"2018-01-21T00:34:54.374Z","typeOfCar":"Trufi","syndicate_id":null},
                      {"id":2,"name":"linea 121","frequency":15,"color":"#0433ff","created_at":"2018-01-21T00:34:54.392Z","updated_at":"2018-01-21T00:34:54.392Z","typeOfCar":"Taxi-trufi","syndicate_id":null},
                      {"id":3,"name":"linea 203","frequency":15,"color":"#008C2F","created_at":"2018-01-21T00:34:54.399Z","updated_at":"2018-01-21T00:34:54.399Z","typeOfCar":"Bus","syndicate_id":null},
                      {"id":4,"name":"linea 120","frequency":12,"color":"#BF6701","created_at":"2018-01-23T20:05:23.710Z","updated_at":"2018-01-23T20:05:23.710Z","typeOfCar":"Taxi-trufi","syndicate_id":null}]


  restProvider: any;
  lines: Line[] = new Array();
  checkpoints: Checkpoint[] = new Array();
  blockedZones: BlockedZone[] = new Array();
  profile: AngularFireObject<Profile>;
  // blockedZoneData: Observable<any>;

  constructor(public http: HttpClient,
              public angularFireAuth: AngularFireAuth,
              private angularFireDatabase: AngularFireDatabase) {
    console.log('Hello RestProvider Provider');
    //this.profile = angularFireDatabase.object('/profile/'+angularFireAuth.auth.currentUser.uid);
  }

  receiveLines() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/lines').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  receiveCheckpointsFromLine(line_id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/lines/'+line_id+"/points").subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getLines() {
    this.lines = [];
    this.receiveLines()
    .then(data => {
      if(isArray(data)){
        data.forEach(line => {
          console.log(line);
          this.lines.push(line);
        });
      }
      
    });
    return this.lines;
  }

  getCheckpointsFromLine(line_id) {
    this.checkpoints = [];
    this.receiveCheckpointsFromLine(line_id)
    .then(data => {
      if(isArray(data)){
        data.forEach(checkpoint => {
          console.log(checkpoint);
          this.checkpoints.push(checkpoint);
        });
      }
      
    });
    return this.checkpoints;
  }

  filterLines(searchQuery: String): Line[]{
    return this.lines.filter((line) => {
      return line.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
    });
  }

  postZoneBlockedData(blockedZoneData){
    this.http.post(this.apiUrl+'/sieges/',blockedZoneData).subscribe(data => {
      alert("Solicitud de bloqueo enviado");

    });
  }

  receiveBlockedZones() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/sieges').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getBlockedZones() {
    this.blockedZones = [];
    this.receiveBlockedZones()
    .then(data => {
      if(isArray(data)){
        data.forEach(bZone => {
          console.log(bZone);
          this.blockedZones.push(bZone);
        });
      }
      
    });
    return this.blockedZones;
  }

  getProfile(): Observable<Profile>{
    return this.profile.valueChanges();
  }

  createProfile(profile: Profile){
    this.angularFireAuth.authState.take(1).subscribe(auth => {
       this.angularFireDatabase.object(`profile/${auth.uid}`).set(profile);
    })
  }

  updateProfile(profile:Profile){
    this.angularFireDatabase.object('/profile/' + this.angularFireAuth.auth.currentUser.uid).update(profile);
  }

  getLinesFound(){
    return this.linesFound1
  }
  
}
