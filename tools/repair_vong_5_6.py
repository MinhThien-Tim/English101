import json
import re
from pathlib import Path

PATH = Path("Vocabulary/vong-5-6-vocabulary-complete-examples.html")

# Corrections are keyed by the stable item id so a learner's saved progress survives
# wording changes.  Items listed in DROP are parser debris, not learnable English.
DROP = {
    "01a14b9b3b41661670ab",  # duplicate untreated sewage
    "44883b5f7955a7b07ec7",  # duplicate deforestation with a mismatched example
    "c8f3cf054cc40a1d6d43",  # duplicate global warming with a mismatched example
    "03c9f77204d4ed6d57de",  # duplicate lead to tension and conflicts
    "43a51dd24d2c79fa6343",  # duplicate lead to environmental degradation
    "dfc3bd656123aefba305",  # duplicate build
}

RESTORE = [
    ("6fc94bc5dc79bfd78bc2", "experiments on cell structures rather than whole animals", "thí nghiệm trên cấu trúc tế bào thay vì trên toàn bộ cơ thể động vật", "Researchers can conduct experiments on cell structures rather than whole animals.", 19),
    ("ebb6837ec3aed56f9541", "form the foundation of trade talks and security agreements", "tạo nền tảng cho các cuộc đàm phán thương mại và thỏa thuận an ninh", "Diplomatic cooperation can form the foundation of trade talks and security agreements.", 20),
    ("85a779fb6de8b0b05078", "use aid as a tool to control recipient countries", "sử dụng viện trợ như một công cụ để kiểm soát các quốc gia nhận viện trợ", "Donor governments should not use aid as a tool to control recipient countries.", 20),
    ("cfdf71f24a4b6b5c95df", "use funds to repay debts instead of investing in profitable projects", "dùng tiền để trả nợ thay vì đầu tư vào các dự án sinh lời", "Some governments use funds to repay debts instead of investing in profitable projects.", 20),
]

FIX = {
    "bd6a8121ecd7fb269779": ("people who travel by car", "người đi lại bằng ô tô", "People who travel by car may find it difficult to avoid congestion during rush hour."),
    "d8c5671a97cdd0f39291": ("people who travel by train", "người đi lại bằng tàu hỏa", "People who travel by train can often use their commuting time to read or work."),
    "9342eb0d90024d01f629": ("be encouraged to do something", "được khuyến khích làm việc gì", "Commuters should be encouraged to use public transport instead of private cars."),
    "1dc7dcf40733f2989d20": ("be responsible for", "chịu trách nhiệm về", "Local authorities are responsible for maintaining essential public services."),
    "bd1e10db1a33e32d7ad4": ("be selectively bred for desirable traits", "được lai tạo có chọn lọc để có những đặc tính mong muốn", "Some crops have been selectively bred for desirable traits such as disease resistance."),
    "caa2576908f5c939b316": ("progress in food production and food security", "tiến bộ trong sản xuất lương thực và an ninh lương thực", "Scientific research has contributed to progress in food production and food security."),
    "966fb53ce9070b10883b": ("increases in agricultural productivity", "sự gia tăng năng suất nông nghiệp", "Better irrigation has led to increases in agricultural productivity."),
    "2869f6e7096639f5b1f5": ("people living below the poverty line", "những người sống dưới mức nghèo khổ", "People living below the poverty line may have limited access to education and healthcare."),
    "671945b19bf1c55bae62": ("difficulty accessing contraception", "khó tiếp cận các biện pháp tránh thai", "People in remote areas may experience difficulty accessing contraception."),
    "d53fefc3ae1c15b5a44e": ("depletion of natural resources", "sự cạn kiệt tài nguyên thiên nhiên", "Rapid population growth can accelerate the depletion of natural resources."),
    "574fb8e949d0d2a93f68": ("intensive agriculture", "nông nghiệp thâm canh", "Intensive agriculture can damage soil and pollute nearby water sources."),
    "174be1dc992220e011fc": ("a growing number of industrial sites", "số lượng cơ sở công nghiệp ngày càng tăng", "A growing number of industrial sites has increased demand for energy in the region."),
    "3b66a8dad34e36c211d0": ("untreated sewage", "nước thải chưa qua xử lý", "Untreated sewage can contaminate rivers and spread disease."),
    "beebd7bf3fb8b2bc773d": ("deforestation", "nạn phá rừng", "Deforestation destroys habitats and reduces biodiversity."),
    "62cdfc6a4febfe28ba59": ("the removal of vast areas of natural forest", "việc phá bỏ những vùng rừng tự nhiên rộng lớn", "The removal of vast areas of natural forest causes severe habitat loss."),
    "a6ee57d3f3a5ab98475c": ("conflicts and wars", "xung đột và chiến tranh", "Competition for scarce resources can contribute to conflicts and wars."),
    "06a41717243e1ebe6122": ("the emergence of new epidemics and pandemics", "sự xuất hiện của các dịch bệnh và đại dịch mới", "Overcrowding can increase the risk of the emergence of new epidemics and pandemics."),
    "9e11ef9adb5b0d3565be": ("overcrowding, pollution, malnutrition and inadequate healthcare", "tình trạng quá tải, ô nhiễm, suy dinh dưỡng và chăm sóc y tế không đầy đủ", "Overcrowding, pollution, malnutrition and inadequate healthcare can facilitate the spread of infectious diseases."),
    "f2009036b99211c221f6": ("a limited number of job vacancies", "số lượng vị trí tuyển dụng hạn chế", "A limited number of job vacancies can lead to intense competition and unemployment."),
    "b7020ad3c30f09a2c051": ("animal extinction", "sự tuyệt chủng của các loài động vật", "Habitat destruction is a major cause of animal extinction."),
    "a016c47a69b4cfabbebf": ("habitat destruction", "sự phá hủy môi trường sống", "Habitat destruction threatens many species with extinction."),
    "3458a28931777d7c180e": ("a population explosion", "sự bùng nổ dân số", "A population explosion can place severe pressure on housing and public services."),
    "ce7bfbd6e846acb28b62": ("put an end to human survival", "đặt dấu chấm hết cho sự tồn tại của loài người", "An extreme environmental catastrophe could put an end to human survival."),
    "d97ba6d7c807f99f0e53": ("put heavy pressure on water supplies", "gây áp lực lớn lên nguồn cung cấp nước", "Population growth can put heavy pressure on water supplies."),
    "fe4609871a5532ebec81": ("contamination", "sự ô nhiễm; sự nhiễm bẩn", "Water contamination poses a serious threat to public health."),
    "09ec1d6206ee70c15838": ("be used to test drugs before they are given to humans", "được dùng để thử nghiệm thuốc trước khi dùng cho người", "Animals are sometimes used to test drugs before they are given to humans."),
    "7696f6c03c5694e60fa3": ("advances in the understanding of genetics", "những tiến bộ trong hiểu biết về di truyền học", "Animal research has contributed to advances in the understanding of genetics."),
    "b35c78e2e9a410c3dbf5": ("serious medical or life-saving purposes", "những mục đích y khoa quan trọng hoặc cứu người", "Some people accept animal testing only for serious medical or life-saving purposes."),
    "dddb7baca2c78f164045": ("cruel, unethical and pointless", "tàn nhẫn, phi đạo đức và vô ích", "Opponents argue that many animal experiments are cruel, unethical and pointless."),
    "eed203f1492476dbec3f": ("physiological and genetic differences between animals and humans", "những khác biệt về sinh lý và di truyền giữa động vật và con người", "Physiological and genetic differences between animals and humans can limit the value of some experiments."),
    "163315926ddf343f3058": ("animals do not develop many human diseases", "động vật không mắc nhiều bệnh ở người", "Animals do not develop many human diseases, so findings do not always transfer to patients."),
    "67c3fe08fcce8c852805": ("treatments that show promise in animals", "các phương pháp điều trị cho kết quả hứa hẹn trên động vật", "Treatments that show promise in animals often fail in human trials."),
    "136a8665dc32cc15882b": ("implant human breast-tumour cells in mice", "cấy tế bào khối u vú của người vào chuột", "Researchers can implant human breast-tumour cells in mice to test potential cancer drugs."),
    "97efc739509718fcec21": ("be spent poorly on unsuccessful projects", "bị chi tiêu kém hiệu quả cho các dự án không thành công", "Foreign aid may be spent poorly on unsuccessful projects."),
    "01e84a4cb444d52c2def": ("be spent with barely any transparency", "được chi tiêu gần như không minh bạch", "Aid money is sometimes spent with barely any transparency or public oversight."),
    "4ff5cdf13078cbecfefe": ("be targeted at poverty reduction", "nhằm mục tiêu giảm nghèo", "Development aid should be targeted at poverty reduction."),
    "eeb34211a73a2e75c9a4": ("be able to hold a conversation in a language", "có thể giao tiếp bằng một ngôn ngữ", "After six months, she was able to hold a conversation in Spanish."),
    "e902972da78e99d8232e": ("be in danger of extinction", "có nguy cơ biến mất", "Many minority languages are in danger of extinction."),
    "55b4596a1e8bc20934ff": ("more people claim pension benefits", "nhiều người nhận trợ cấp hưu trí hơn", "As the population ages, more people claim pension benefits."),
    "dedf78b063bbae9a597d": ("social isolation and developmental and physical health problems", "sự cô lập xã hội cùng các vấn đề phát triển và sức khỏe thể chất", "Neglect can cause social isolation and developmental and physical health problems in children."),
    "2a57e1071e166f4e312e": ("people's health", "sức khỏe con người", "Air and water pollution can seriously damage people's health."),
    "0b3f13c5cd8eebd873a0": ("young people spend more time caring for elderly parents", "người trẻ dành nhiều thời gian hơn để chăm sóc cha mẹ già", "An ageing population may mean that young people spend more time caring for elderly parents."),
    "8b04057487c9c6d8aadc": ("be in complete control of one's working environment", "hoàn toàn kiểm soát môi trường làm việc của mình", "Remote workers can be in complete control of their working environment."),
    "b680b363c369c91ea63a": ("be discharged into the environment", "bị thải ra môi trường", "Toxic chemicals must not be discharged into the environment."),
}

FIX.update({
    "e76eb1a3c8a51b264bf9": ("waste generation", "sự phát sinh chất thải", "Waste generation increases when consumers rely heavily on disposable products."),
    "d3b0d4285d4cf00c83cd": ("solve a problem", "giải quyết một vấn đề", "Environmental agencies are working together to solve the problem of illegal dumping."),
    "f339888cd81c91bc73c4": ("narrow the income gap", "thu hẹp khoảng cách thu nhập", "Progressive taxation can help narrow the income gap."),
    "5e994049db58082492cd": ("achieve a work-life balance", "đạt được sự cân bằng giữa công việc và cuộc sống", "Flexible hours can help employees achieve a better work-life balance."),
    "38b7837535358b6d11c1": ("reduce working hours", "giảm số giờ làm việc", "Some employers have reduced working hours without cutting salaries."),
    "94f7e304a6727935d2b8": ("build a wind turbine", "xây dựng tua-bin gió", "Engineers plan to build a wind turbine near the coast."),
    "5cfbaa8964481db39ded": ("repurchase", "mua lại", "The company may repurchase its own shares when market prices are low."),
    "190576404226fb5c1be2": ("overspend", "chi tiêu quá mức", "Governments risk going into debt if they consistently overspend."),
    "e280939199ba9e0e220c": ("disappear", "biến mất", "Traditional crafts may disappear if younger generations do not learn them."),
    "0596ada6445326392469": ("have a negative impact on", "có tác động tiêu cực đến", "Social exclusion can have a negative impact on cultural diversity."),
    "766a05e855d349398088": ("have a detrimental effect on", "có ảnh hưởng bất lợi đến", "Excessive packaging can have a detrimental effect on the environment."),
    "0c88fab38cc746ef3db8": ("genetically modified foods", "thực phẩm biến đổi gen", "Genetically modified foods may improve crop yields and resistance to pests."),
    "273023f65edd4e572909": ("heat-trapping gases", "các khí giữ nhiệt", "Burning fossil fuels releases heat-trapping gases into the atmosphere."),
    "8d236c894da1ea9a5679": ("conflict over water", "xung đột về nguồn nước", "Increasing scarcity may lead to conflict over water."),
    "33171fd152a078546cdc": ("family planning", "kế hoạch hóa gia đình", "Access to family planning enables people to make informed reproductive choices."),
    "ccd64159b85f1a62e4bd": ("fuel-burning facilities", "các cơ sở đốt nhiên liệu", "Power stations, factories and other fuel-burning facilities are major sources of air pollution."),
    "5b67cc78358de5fb1158": ("agricultural activities", "các hoạt động nông nghiệp", "Agricultural activities can release pesticides, ammonia and dust into the environment."),
    "355f5db17972af21ad2b": ("mining operations", "hoạt động khai khoáng", "Mining operations can generate dust and contaminate nearby water sources."),
    "68302e68ccfe0b9ad575": ("pastureland and crop fields", "đồng cỏ chăn nuôi và đất trồng trọt", "Forests are sometimes cleared to create pastureland and crop fields."),
    "207651d98d045e5544d1": ("a significant source of methane emissions", "một nguồn phát thải khí mê-tan đáng kể", "Landfill waste is a significant source of methane emissions."),
    "9129b32de50564750071": ("population growth and urbanisation", "gia tăng dân số và đô thị hóa", "Population growth and urbanisation have increased demand for transport and energy."),
    "12acdffebc92b1fb0118": ("dust from large areas of bare land", "bụi từ những vùng đất trống rộng lớn", "Wind can carry dust from large areas of bare land over long distances."),
    "3ff3ccede4f5b9073865": ("wildfires caused by prolonged dry periods", "cháy rừng do thời kỳ khô hạn kéo dài", "Climate change can increase the risk of wildfires caused by prolonged dry periods."),
    "028340df3c8be62fe441": ("precipitation", "lượng mưa; sự giáng thủy", "Changes in precipitation can affect water supplies and crop yields."),
    "4b6d3c59d3b46878d7ef": ("volcanic activity", "hoạt động núi lửa", "Volcanic activity can release ash and gases into the atmosphere."),
    "665d7405a2679d2343e5": ("large quantities of sulfur, chlorine and ash", "lượng lớn lưu huỳnh, clo và tro", "Major eruptions can release large quantities of sulfur, chlorine and ash."),
    "10d25fb9bf870fa26616": ("health problems and premature death", "các vấn đề sức khỏe và tử vong sớm", "Long-term exposure to air pollution can cause health problems and premature death."),
    "655ff5ec7db119fcad13": ("environmental effects", "các tác động đối với môi trường", "Air pollution has serious environmental effects as well as health effects."),
    "8911648d9ceeba59cfbe": ("acid rain", "mưa axit", "Sulfur dioxide and nitrogen oxides contribute to acid rain."),
    "eecbbeaf766c0dc554f0": ("animals' exposure to air pollution", "việc động vật tiếp xúc với ô nhiễm không khí", "Animals' exposure to air pollution can damage their respiratory systems."),
    "07289ab4352bd0c67e50": ("cycle instead of travelling in high-emission vehicles", "đi xe đạp thay vì sử dụng phương tiện phát thải cao", "People can cycle instead of travelling in high-emission vehicles for short journeys."),
    "f9ac3a8cea8144ee43c8": ("increase competition for jobs", "làm tăng sự cạnh tranh việc làm", "A higher retirement age may increase competition for jobs in some sectors."),
    "e63a1f7560a8aa7d285a": ("sedentary lifestyles", "lối sống ít vận động", "Sedentary lifestyles increase the risk of obesity and cardiovascular disease."),
    "7c1670ff19bb91b3c6a5": ("fast food", "đồ ăn nhanh", "Frequent consumption of fast food can contribute to weight gain."),
    "9b12cc1d2e0bfd6dd21e": ("pre-made food", "thực phẩm chế biến sẵn", "Pre-made food is convenient but can contain excessive salt and sugar."),
    "39411cc61edf8f3c71b6": ("rapid weight gain", "tình trạng tăng cân nhanh", "Rapid weight gain may indicate an underlying health problem."),
    "c11f4903b886c9c059f2": ("weight problems", "các vấn đề về cân nặng", "A balanced diet can help prevent weight problems."),
    "410b84fe56156c6bcada": ("obesity", "bệnh béo phì", "Obesity is associated with an increased risk of several chronic diseases."),
    "af796bd68144db75b4de": ("childhood obesity", "béo phì ở trẻ em", "Schools can help tackle childhood obesity by promoting physical activity."),
    "f1c9ff376cdbf50cf143": ("public health campaigns", "các chiến dịch y tế công cộng", "Public health campaigns can raise awareness of preventable diseases."),
    "64ab289d7eac029741c8": ("school-based education programmes", "các chương trình giáo dục tại trường", "School-based education programmes can teach children about healthy eating."),
    "1e56df079a5ef4e162f8": ("heavy taxation of fast food", "việc đánh thuế cao đối với đồ ăn nhanh", "Heavy taxation of fast food may discourage excessive consumption."),
    "62fc0c4c3473e089e057": ("home-cooked food", "đồ ăn nấu tại nhà", "Home-cooked food is often healthier than highly processed food."),
    "1aca532ad05524e8afae": ("be at higher risk of heart disease", "có nguy cơ mắc bệnh tim cao hơn", "People with obesity may be at higher risk of heart disease."),
    "0972500d91c0328895c1": ("average life expectancy", "tuổi thọ trung bình", "Average life expectancy has risen as healthcare has improved."),
    "6dc73f49a841153595db": ("treatment costs", "chi phí điều trị", "Preventive healthcare can reduce long-term treatment costs."),
    "65ccca1abd7dfaa8a26e": ("the prevalence of fast and processed food", "mức độ phổ biến của đồ ăn nhanh và thực phẩm chế biến sẵn", "The prevalence of fast and processed food has changed eating habits."),
    "6ba8b1b97b90614b95ea": ("higher crime rates", "tỷ lệ tội phạm cao hơn", "High unemployment is sometimes associated with higher crime rates."),
    "bc1b480c5ab5924d9a92": ("rapidly growing human populations", "dân số loài người tăng nhanh", "Rapidly growing human populations put pressure on natural resources."),
    "aa257171797fc6ef7dba": ("an increase in the global birth rate", "sự gia tăng tỷ lệ sinh toàn cầu", "An increase in the global birth rate would accelerate population growth."),
    "c05ffe99dfc97b1c8272": ("advances in science, technology, medicine and food production", "những tiến bộ trong khoa học, công nghệ, y học và sản xuất lương thực", "Advances in science, technology, medicine and food production have helped people live longer."),
    "9f25e10610d9b75575c7": ("increased demand for water", "nhu cầu về nước gia tăng", "Population growth has resulted in increased demand for water."),
    "da619c944171d3a42e50": ("population-control measures", "các biện pháp kiểm soát dân số", "Population-control measures remain politically and ethically controversial."),
    "e714feeb3fb514b8fc35": ("be essential to understanding diseases and developing treatments", "thiết yếu để hiểu bệnh tật và phát triển phương pháp điều trị", "Medical research is essential to understanding diseases and developing new treatments."),
    "6caf216684ebb442fc75": ("a wealth of medical advances", "rất nhiều tiến bộ y học", "Animal research has contributed to a wealth of medical advances."),
    "3a656899c75082291f0f": ("HIV", "vi-rút gây suy giảm miễn dịch ở người", "HIV attacks the immune system and can lead to AIDS if left untreated."),
    "4463aed7b0d7dcd136de": ("the breeding of genetically modified animals", "việc nhân giống động vật biến đổi gen", "The breeding of genetically modified animals raises ethical concerns."),
    "f3139c251ab099b5b627": ("non-animal alternative methods", "các phương pháp thay thế không sử dụng động vật", "Researchers are developing non-animal alternative methods for toxicity testing."),
    "7e2cfca0388b18f3fc17": ("be a vital part of", "là một phần thiết yếu của", "Language is a vital part of cultural identity."),
    "920057c411dd70b25534": ("robots with human-like characteristics", "robot có các đặc điểm giống con người", "Robots with human-like characteristics may be easier for people to interact with."),
    "4ad8cbb7cf5a56d36e50": ("be highly exposed to weather extremes", "chịu ảnh hưởng lớn của thời tiết cực đoan", "Small-scale farmers are highly exposed to weather extremes."),
    "342812e027f00ef98d5f": ("be highly sensitive to variations in rainfall and temperature", "rất nhạy cảm với biến động lượng mưa và nhiệt độ", "Crop yields are highly sensitive to variations in rainfall and temperature."),
    "db798fac0985eb186544": ("be willing to do anything to survive", "sẵn sàng làm bất cứ điều gì để sinh tồn", "Desperate people may be willing to do anything to survive, whether it is legal or not."),
    "8bf5487c6f5bccd0d723": ("older people participate in community service and voluntary work", "người cao tuổi tham gia hoạt động cộng đồng và công việc tình nguyện", "Many older people participate in community service and voluntary work after retirement."),
    "ebca33556b5b56c08ed1": ("be under enormous financial pressure", "chịu áp lực tài chính rất lớn", "Families with only one income may be under enormous financial pressure."),
    "2713e54af33fe3a1ccfc": ("be socially acceptable", "được xã hội chấp nhận", "Attitudes change as previously unusual family arrangements become socially acceptable."),
    "5a2c4e3d69198917d733": ("be highly dangerous and life-threatening", "rất nguy hiểm và đe dọa tính mạng", "Contact with a large wild animal can be highly dangerous and life-threatening."),
    "75ea4e43123b6c2e3ebc": ("be kept in zoos", "được nuôi nhốt trong vườn thú", "Some endangered animals are kept in zoos as part of conservation programmes."),
    "7839405d153481dafbaa": ("be treated with respect", "được đối xử một cách tôn trọng", "Animals should be treated with respect and protected from unnecessary suffering."),
    "5f86b084acf85ce88597": ("be provided with a wealth of knowledge", "được cung cấp một lượng kiến thức phong phú", "Students can be provided with a wealth of knowledge through well-designed online courses."),
    "a06219c2bf68029d3899": ("be under threat from", "bị đe dọa bởi", "Historic buildings are under threat from neglect and redevelopment."),
    "d3d400048fa4de089264": ("be demolished and replaced by", "bị phá dỡ và thay thế bằng", "Old houses are sometimes demolished and replaced by apartment blocks."),
    "071ed258b25949a5bb0d": ("be an integral part of", "là một phần không thể thiếu của", "Historic buildings are an integral part of a city's identity."),
    "3c4ffdff36bfc5b43b60": ("be at risk from neglect and decay", "có nguy cơ xuống cấp do bị bỏ bê", "Unoccupied historic buildings are at risk from neglect and decay."),
    "b61800bdf1fd19ecf1a1": ("be released from prison", "được trả tự do khỏi nhà tù", "Offenders may be released from prison after serving their sentences."),
    "dce1efb1a656c02584f1": ("people from different cultural backgrounds", "những người có nền tảng văn hóa khác nhau", "People from different cultural backgrounds can learn from one another."),
})

def normalize_item(item, word, meaning, example):
    old_word = item["w"]
    item["w"] = word
    item["vi"] = meaning
    item["ex"] = example
    item["aliases"] = list(dict.fromkeys([word, old_word]))
    item["forms"] = list(dict.fromkeys([word, old_word]))
    item["acceptedVI"] = [meaning]
    item["qualityReview"] = False
    item["notes"] = ["Mục đã được tái cấu trúc từ dòng nguồn bị tách hoặc ghép sai."]
    item["patterns"] = ["Học cả cụm và thay phần bổ ngữ bằng nội dung phù hợp với ngữ cảnh."]
    item["cloze"] = {"sentence": example, "answer": word, "full": example, "changed": True, "valid": False}
    item["formNote"] = "Mục này dùng để học nghĩa và cách kết hợp từ; không dùng trong bài điền tự chấm."
    item["chunk"] = ""
    item["chunkBlank"] = ""

text = PATH.read_text(encoding="utf-8")
start = text.index("const DATA=") + len("const DATA=")
end = text.index("], GROUPS=", start) + 1
items = json.loads(text[start:end])

result = []
seen = set()
for item in items:
    if item["id"] in DROP or item["w"].strip().startswith(("→", "←")):
        continue
    if item["id"] in FIX:
        normalize_item(item, *FIX[item["id"]])
    key = re.sub(r"\s+", " ", item["w"].strip().casefold())
    if key in seen and item["qualityReview"]:
        continue
    seen.add(key)
    result.append(item)

existing_ids = {item["id"] for item in result}
for item_id, word, meaning, example, group in RESTORE:
    if item_id in existing_ids:
        continue
    result.append({
        "id": item_id, "w": word, "tier": "V6", "ipa": "—", "pos": "collocation",
        "vi": meaning, "ex": example, "groups": [group], "refs": [], "forms": [word],
        "aliases": [word], "notes": ["Mục đã được khôi phục và tái cấu trúc từ một dòng nguồn bị parser cắt hỏng."],
        "translation": "", "patterns": ["Học cả cụm và thay phần bổ ngữ bằng nội dung phù hợp với ngữ cảnh."],
        "cloze": {"sentence": example, "answer": word, "full": example, "changed": True, "valid": False},
        "formNote": "Mục này dùng để học nghĩa và cách kết hợp từ; không dùng trong bài điền tự chấm.",
        "chunk": "", "chunkBlank": "", "acceptedVI": [meaning], "synGroups": [],
        "posTokens": ["collocation"], "sourceRows": [], "originalWord": word, "qualityReview": False,
    })

# pay off has several common constructions; the existing example illustrates
# only the intransitive 'produce a good result' sense.
for item in result:
    if item["w"] == "pay off":
        item["vi"] = "mang lại kết quả tốt; trả hết (nợ); mua chuộc ai"
        item["acceptedVI"] = ["mang lại kết quả tốt", "đem lại kết quả", "trả hết nợ", "mua chuộc"]
        item["patterns"] = [
            "something pays off: một nỗ lực hoặc khoản đầu tư mang lại kết quả tốt.",
            "pay off something / pay something off: trả hết một khoản nợ.",
            "pay somebody off: mua chuộc ai hoặc trả tiền để họ im lặng (nghĩa tiêu cực).",
        ]
        item["notes"] = [
            "Trong câu “Long-term investment in education tends to pay off”, pay off là nội động từ và mang nghĩa “đem lại kết quả tốt”.",
            "Ví dụ thêm: We finally paid off the mortgage. / They tried to pay the witness off.",
        ]

payload = json.dumps(result, ensure_ascii=False, separators=(",", ":"))
text = text[:start] + payload + text[end:]
item_count = f"{len(result):,}".replace(",", ".")
valid_count_raw = sum(bool(x.get("cloze", {}).get("valid")) for x in result)
valid_count = f"{valid_count_raw:,}".replace(",", ".")
text = re.sub(r"1\.28[0-9] mục học", f"{item_count} mục học", text)
text = re.sub(r"Giữ 1\.28[0-9] dòng dữ liệu trong 1\.28[0-9] mục học", f"Giữ {item_count} mục học đã chuẩn hóa", text)
text = re.sub(r"\d{1,2}\.\d{3} bài điền", f"{valid_count} bài điền", text)
text = re.sub(r"Có \d+ mục đủ điều kiện luyện điền", f"Có {valid_count_raw} mục đủ điều kiện luyện điền", text)
PATH.write_text(text, encoding="utf-8", newline="")
print(f"Rewrote {len(items)} items as {len(result)} items; corrected {sum(i in FIX for i in {x['id'] for x in items})}; canonical total: {len(result)}.")
