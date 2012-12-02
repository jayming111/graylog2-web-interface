(function(e,t){var n=function(){var t=this;e.isFunction(t._init)&&t._init.apply(t,arguments)};n.prototype={_init:function(t,n){var r=this,i={};r.defaults=e.fn.shell.defaults,e.extend(!0,i,r.defaults,t),r.options=i,r.$element=e(n),r.history=[],r.historyIndex=0,r._setWidthOfInput(),r._bindEventsFromKeyboard(),r.focus()},focus:function(){var e=this;e.$element.find("input").focus()},_setWidthOfInput:function(){var t=e("#shell-container"),n=t.find(".shell-prompt"),r=30,i=t.outerWidth(!1)-n.outerWidth(!1)-r;t.find("input").css("width",i)},_bindEventsFromKeyboard:function(){var t=this,n=e("#shell-container"),r=n.find("input"),i,s,o;r.on("keyup",function(e){s=e.which;switch(s){case 13:t._handleEnterPress();break;case 38:t.historyIndex>0&&t.historyIndex--,i=t.history[t.historyIndex],r.val(i);break;case 40:t.historyIndex<=t.history.length&&t.historyIndex++,i=t.history[t.historyIndex],r.val(i);break;default:}t.lastCode=s})},_handleEnterPress:function(){var t=this,n=e("#shell-container"),r=n.find("input"),i=r.val();if(!e.trim(i).length)return;if(i==="clear"){t._clearShell();return}t._handleHistory(i),t._processInput(i),r.val("")},_handleHistory:function(e){var t=this,n=t.history.length,r=[],i;if(n===0){t.history[0]=e;return}t.history.push(e),t.historyIndex=t.history.length},_clearShell:function(){var t=e(".shell-old-input, .shell-wait");t.remove()},_processInput:function(t){var n=this,r=e("#shell"),i=r.find("#shell-command-input"),s=r.find(".shell-prompt").first(),o=r.find("#shell-oldinput-container"),u='<div class="shell-wait"><div class="shell-loading"></div><div>Calculating</div></div>',a='<div class="shell-history-line"><span class="shell-prompt">'+s.text()+"&nbsp;</span>"+'<span class="shell-old-input">'+i.val()+"</span></div>",f=n.options.history;r.append(u),f&&o.append(a),i.prop("disabled","disabled"),n._makeAjaxCall(t)},_makeAjaxCall:function(t){var n=this;e.ajax({type:"POST",url:"analytics/shell",dataType:"json",data:{cmd:t},success:function(e){n._renderCallback(e)},error:function(){n._renderCallback({code:"error",reason:"Internal error."})}})},_buildResultLine:function(e,t){var n=this;return'<div class="'+e+'">'+n._getTimestamp()+" - "+t+"</div>"},_getTimestamp:function(){var e=this,t=new Date;return e._dateHelper(t.getHours())+":"+e._dateHelper(t.getMinutes())+":"+e._dateHelper(t.getSeconds())},_dateHelper:function(e){var t=+e;return t<10&&(t="0"+t),t},_renderCallback:function(t){var n=this,r=e("#shell"),i=r.find("#shell-oldinput-container"),s=r.find(".shell-wait"),o=r.find("#shell-command-input"),u=n.options.history,a,f;s.remove(),o.prop("disabled",""),i.find(".shell-history-line").length>=15&&(i.find(".shell-history-line").first().remove(),i.find(".shell-history-result-line").first().remove());if(!t){a=n._buildResultLine("shell-error shell-history-result-line","Internal error - Undefined result."),i.append(a);return}if(t.code&&t.code==="error"){a=n._buildResultLine("shell-error shell-history-result-line","Error: "+t.reason),i.append(a);return}if(!t.op){n._logToConsole("Found no data.op or other suitable data");return}if(t.code==="success"){f="Completed in "+t.ms+"ms";switch(t.op){case"count":f+=n._buildCountResult(t.result);break;case"distinct":f+=n._buildDistinctResult(t.result);break;case"distribution":f+=n._buildDistributionResult(t.result)}t.op==="find"&&n._replaceContent(t.content),a=n._buildResultLine("shell-success shell-history-result-line",f),i.append(a)}},_replaceContent:function(t){var n=e("#content-inner");n.html(t)},_buildCountResult:function(e){var t=this,n=" - Count result: ";return n+t._wrapInSpan("shell-result-string",e)},_buildDistinctResult:function(e){var t=this,n=" - Distinct result: ",r=e.length,i=0,s=Object.prototype.hasOwnProperty,o;if(r===0)n+="No matches.";else for(o in e)s.call(e,o)&&(n+=e[o],i<r-1&&(n+=","),i++);return t._wrapInSpan("shell-result-string",n)},_buildDistributionResult:function(e){var t=this,n=" - Distribution result: ",r=e.length,i=0,s=Object.prototype.hasOwnProperty,o;if(e.length===0)n+="No matches.";else for(o in e)s.call(e,o)&&(n+=e[o].distinct+" ("+parseInt(e[o].count,10)+")",i<r-1&&(n+=", "),i++);return t._wrapInSpan("shell-result-string",n)},_wrapInSpan:function(e,t){return'<span class="'+e+'">'+t+"</span>"},_logToConsole:function(e){t.console&&console.log&&console.log(e)}},e.fn.extend({shell:function(t){var r=Array.prototype.slice.call(arguments),i=r.shift();return this.each(function(s,o){var u=e.data(o,"shell")||e.data(o,"shell",new n(t,o));i&&typeof i=="string"&&i.charAt(0)!=="_"&&e.isFunction(u[i])&&u[i].apply(u,r)})}}),e.fn.shell.defaults={history:!0}})(jQuery,window);