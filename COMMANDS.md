# 🚀 সম্পূর্ণ কমান্ড চিটশিট (Complete Commands Guide)

এই ফাইলে আপনার প্রোজেক্টটি চালানো, ডিপ্লয় করা, টেস্ট করা এবং মনিটর করার সমস্ত প্রয়োজনীয় কমান্ড গুছিয়ে দেওয়া হলো।

---

## 📌 ১. দ্রুত শুরু (Quick Start - ৩টি কমান্ড)

সবকিছু চালু ও টেস্ট করার মূল ৩টি কমান্ড:

```powershell
# ১. Kong Gateway-কে পোর্টে কানেক্ট রাখুন (আলাদা টার্মিনালে চালু রাখবেন)
kubectl port-forward -n kong svc/kong-gateway-proxy 8000:80

# ২. টার্মিনাল থেকে ৩টি Pod-এ লোড ব্যালান্সিং টেস্ট করুন
.\test-pods.ps1

# ৩. ব্রাউজারে অ্যাপটি লাইভ দেখুন
# ব্রাউজারে ওপেন করুন: http://localhost:8000/
```

---

## 🛠️ ২. Kubernetes ডিপ্লয়মেন্ট কমান্ডসমূহ

### ২.১ সমস্ত ম্যানিফেস্ট ক্লাস্টারে অ্যাপ্লাই করা
```powershell
# React-এর ৩টি Pod, Service ও ConfigMap অ্যাপ্লাই
kubectl apply -f k8s/react-deployment.yaml

# Kong Ingress Controller ও CORS Plugin অ্যাপ্লাই
kubectl apply -f k8s/kong-ingress.yaml
```

### ২.২ ডিপ্লয়মেন্ট রিস্টার্ট ও রোলআউট স্ট্যাটাস চেক
```powershell
# ৩টি Pod-কে লেটেস্ট কোডে Zero-Downtime রোলিং আপডেট করা
kubectl rollout restart deployment/react-app

# আপডেট সফল হওয়া পর্যন্ত অপেক্ষা ও চেক
kubectl rollout status deployment/react-app
```

### ২.৩ Pod, Service ও Ingress স্ট্যাটাস দেখা
```powershell
# ৩টি React Pod কোন কোন নোডে চলছে দেখা
kubectl get pods -l app=react-app -o wide

# সার্ভিস চেক (NodePort 30083)
kubectl get svc react-service

# Kong Ingress রুলস চেক
kubectl get ingress kong-api-ingress

# সমস্ত Pods এর সার্বিক অবস্থা দেখা
kubectl get pods -A
```

---

## 🦍 ৩. Kong API Gateway পরিচালনা ও টেস্ট কমান্ড

### ৩.১ Kong Proxy পোর্ট-ফরোয়ার্ড (লোকাল এক্সেসের জন্য)
```powershell
kubectl port-forward -n kong svc/kong-gateway-proxy 8000:80
```

### ৩.২ টার্মিনাল থেকে Kong হয়ে ৩টি Pod-এ রিকোয়েস্ট পাঠানো
```powershell
# ১টি সিঙ্গেল রিকোয়েস্ট (কোন Pod রেসপন্স দিচ্ছে দেখতে):
curl.exe -s http://localhost:8000/api/pod-info

# পরপর ৯টি রিকোয়েস্ট পাঠিয়ে রাউন্ড-রবিন টেস্ট (১-লাইনার):
1..9 | ForEach-Object { (curl.exe -s http://localhost:8000/api/pod-info | ConvertFrom-Json).pod }

# বিস্তারিত গ্রাফ ও টাইমিং সহ টেস্ট স্ক্রিপ্ট রান:
.\test-pods.ps1

# ২০টি রিকোয়েস্ট পাঠাতে চাইলে:
.\test-pods.ps1 -TotalHits 20
```

---

## 🐳 ৪. Docker ইমেজ বিল্ড ও ডকার হাব কমান্ড

```powershell
# ১. ডকার ইমেজ লোকালি বিল্ড করা
docker build -t nitishpaul/react-hello-world:latest .

# ২. ডকার হাবে লগইন করা
docker login -u nitishpaul

# ৩. ডকার হাবে ইমেজ পুশ করা
docker push nitishpaul/react-hello-world:latest

# ৪. লোকাল ডকার কন্টেইনারে একাকী রান করে টেস্ট করতে চাইলে
docker run -d -p 3000:80 --name react-app-test nitishpaul/react-hello-world:latest
```

---

## 🔍 ৫. লাইভ সার্ভার লগ্স (Debugging & Logs)

```powershell
# ৩টি React Pod-এর লাইভ এক্সেস লগ একসাথে দেখা:
kubectl logs -l app=react-app -f --prefix=true

# Kong Gateway-এর লাইভ প্রক্সি লগ দেখা:
kubectl logs -n kong deployment/kong-gateway -f --tail=30

# নির্দিষ্ট কোনো একটি Pod-এর ভেতরে সরাসরি ঢুকে দেখতে:
# (যেকোনো একটি pod name দিয়ে রিপ্লেস করুন)
kubectl exec -it react-app-7778d476f7-4gm9x -- sh
```

---

## 🌐 ৬. লোকাল React ডেভেলপমেন্ট রান (Vite Dev Server)

```powershell
# ডিপেন্ডেন্সি ইন্সটল
npm install

# লোকাল ডেভ সার্ভার রান (http://localhost:5173)
npm run dev

# প্রোডাকশন বিল্ড তৈরি
npm run build
```

---

## 🏗️ ৭. Jenkins Pipeline রান করার নিয়ম

1. ব্রাউজারে Jenkins ওপেন করুন: `http://localhost:8080/`
2. আপনার প্রোজেক্টে যান (`react-local-deploy`)।
3. বাম পাশের মেন্যু থেকে **"Build Now"** বাটনে ক্লিক করুন।
4. পাইপলাইন স্বয়ংক্রিয়ভাবে:
   - Git থেকে কোড টানবে
   - ডকার ইমেজ বিল্ড করবে
   - Docker Hub-এ পুশ করবে
   - Kubernetes ক্লাস্টারে ৩টি Pod রোলিং আপডেট করে দেবে!
